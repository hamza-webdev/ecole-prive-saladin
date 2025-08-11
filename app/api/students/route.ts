
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { CreateStudentData } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const classId = searchParams.get('classId');
    const level = searchParams.get('level');
    const isActive = searchParams.get('isActive');

    const where: any = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { parentName: { contains: search, mode: 'insensitive' } },
        { parentEmail: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (classId) {
      where.studentClasses = { some: { classId } };
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const students = await prisma.student.findMany({
      where,
      include: {
        studentClasses: {
          include: { class: true }
        }
      },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' }
      ]
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Erreur lors de la récupération des élèves:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'TEACHER', 'STAFF'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const body = await request.json();
    const studentData: CreateStudentData = body;

    // Validation des données
    if (!studentData.firstName || !studentData.lastName || !studentData.dateOfBirth || 
        !studentData.parentName || !studentData.parentPhone || !studentData.parentEmail) {
      return NextResponse.json(
        { error: 'Les champs obligatoires sont manquants' },
        { status: 400 }
      );
    }

    const student = await prisma.student.create({
      data: {
        ...studentData,
        dateOfBirth: new Date(studentData.dateOfBirth),
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'élève:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
