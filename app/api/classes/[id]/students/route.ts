
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'TEACHER'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { studentId } = await request.json();

    if (!studentId) {
      return NextResponse.json(
        { error: 'ID de l\'élève manquant' },
        { status: 400 }
      );
    }

    // Vérifier si l'élève n'est pas déjà dans cette classe
    const existing = await prisma.studentClass.findUnique({
      where: {
        studentId_classId: {
          studentId,
          classId: params.id
        }
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'L\'élève est déjà dans cette classe' },
        { status: 400 }
      );
    }

    const studentClass = await prisma.studentClass.create({
      data: {
        studentId,
        classId: params.id,
      },
      include: {
        student: true,
        class: true,
      }
    });

    return NextResponse.json(studentClass, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de l\'affectation de l\'élève:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'TEACHER'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const { studentId } = await request.json();

    await prisma.studentClass.delete({
      where: {
        studentId_classId: {
          studentId,
          classId: params.id
        }
      }
    });

    return NextResponse.json({ message: 'Élève retiré de la classe avec succès' });
  } catch (error) {
    console.error('Erreur lors du retrait de l\'élève:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
