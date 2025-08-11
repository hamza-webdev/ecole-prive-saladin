
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { CreateClassData } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const level = searchParams.get('level');
    const schoolYear = searchParams.get('schoolYear');
    const teacherId = searchParams.get('teacherId');

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { level: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (level) {
      where.level = { contains: level, mode: 'insensitive' };
    }

    if (schoolYear) {
      where.schoolYear = schoolYear;
    }

    if (teacherId) {
      where.teacherId = teacherId;
    }

    const classes = await prisma.class.findMany({
      where,
      include: {
        teacher: true,
        studentClasses: {
          include: { student: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error('Erreur lors de la récupération des classes:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'TEACHER'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const body = await request.json();
    const classData: CreateClassData = body;

    // Validation des données
    if (!classData.name || !classData.level || !classData.schoolYear) {
      return NextResponse.json(
        { error: 'Les champs obligatoires sont manquants' },
        { status: 400 }
      );
    }

    const newClass = await prisma.class.create({
      data: classData,
      include: {
        teacher: true,
        studentClasses: {
          include: { student: true }
        }
      }
    });

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la classe:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
