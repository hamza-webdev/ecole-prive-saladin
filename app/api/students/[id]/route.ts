
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const student = await prisma.student.findUnique({
      where: { id: params.id },
      include: {
        studentClasses: {
          include: { class: true }
        }
      }
    });

    if (!student) {
      return NextResponse.json({ error: 'Élève non trouvé' }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'élève:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['ADMIN', 'TEACHER', 'STAFF'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    const body = await request.json();
    const { dateOfBirth, ...otherData } = body;

    const student = await prisma.student.update({
      where: { id: params.id },
      data: {
        ...otherData,
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        updatedAt: new Date(),
      },
      include: {
        studentClasses: {
          include: { class: true }
        }
      }
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'élève:', error);
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
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
    }

    // Supprimer les relations d'abord
    await prisma.studentClass.deleteMany({
      where: { studentId: params.id }
    });

    // Puis supprimer l'élève
    await prisma.student.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Élève supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élève:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
