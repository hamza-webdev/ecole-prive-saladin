
'use client';

import { useState } from 'react';
import { StudentWithClasses } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EditStudentModal } from './edit-student-modal';
import { MoreHorizontal, Edit, Trash2, User, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

interface StudentsListProps {
  students: StudentWithClasses[];
  isLoading: boolean;
  onStudentUpdated: () => void;
  onStudentDeleted: () => void;
}

export function StudentsList({ students, isLoading, onStudentUpdated, onStudentDeleted }: StudentsListProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [editStudent, setEditStudent] = useState<StudentWithClasses | null>(null);

  const handleDeleteStudent = async (studentId: string) => {
    if (!session?.user || session.user.role !== 'ADMIN') {
      toast({
        title: 'Erreur',
        description: 'Seuls les administrateurs peuvent supprimer des élèves',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élève ? Cette action est irréversible.')) {
      return;
    }

    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      onStudentDeleted();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'élève',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (students?.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun élève trouvé
          </h3>
          <p className="text-gray-500">
            Aucun élève ne correspond à vos critères de recherche.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students?.map?.((student) => (
          <Card key={student?.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {student?.firstName} {student?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {student?.dateOfBirth && format(new Date(student.dateOfBirth), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={student?.isActive ? 'default' : 'secondary'}>
                    {student?.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditStudent(student)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      {session?.user?.role === 'ADMIN' && (
                        <DropdownMenuItem 
                          onClick={() => student?.id && handleDeleteStudent(student.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-3">
                {student?.studentClasses?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Classes:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.studentClasses.map((sc) => (
                        <Badge key={sc?.class?.id} variant="outline" className="text-xs">
                          {sc?.class?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-3 border-t space-y-2">
                  <p className="text-sm font-medium text-gray-700">Contact parent:</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-3 w-3" />
                      <span>{student?.parentName}</span>
                    </div>
                    {student?.parentPhone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{student.parentPhone}</span>
                      </div>
                    )}
                    {student?.parentEmail && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{student.parentEmail}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editStudent && (
        <EditStudentModal
          student={editStudent}
          isOpen={!!editStudent}
          onClose={() => setEditStudent(null)}
          onStudentUpdated={() => {
            setEditStudent(null);
            onStudentUpdated();
          }}
        />
      )}
    </>
  );
}
