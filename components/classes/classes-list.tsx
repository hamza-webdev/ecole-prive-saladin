
'use client';

import { useState } from 'react';
import { ClassWithStudents } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ManageStudentsModal } from './manage-students-modal';
import { MoreHorizontal, Users, GraduationCap, Calendar } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface ClassesListProps {
  classes: ClassWithStudents[];
  isLoading: boolean;
  onClassUpdated: () => void;
  onRefresh: () => void;
}

export function ClassesList({ classes, isLoading, onClassUpdated, onRefresh }: ClassesListProps) {
  const { data: session } = useSession();
  const [selectedClass, setSelectedClass] = useState<ClassWithStudents | null>(null);

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

  if (classes?.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune classe trouvée
          </h3>
          <p className="text-gray-500">
            Aucune classe ne correspond à vos critères de recherche.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getCapacityColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes?.map?.((classItem) => {
          const studentCount = classItem?.studentClasses?.length || 0;
          const maxStudents = classItem?.maxStudents || 30;

          return (
            <Card key={classItem?.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {classItem?.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">
                        {classItem?.level}
                      </Badge>
                      {classItem?.section && (
                        <Badge variant="secondary">
                          Section {classItem.section}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedClass(classItem)}>
                        <Users className="mr-2 h-4 w-4" />
                        Gérer les élèves
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>Élèves:</span>
                    </div>
                    <span className={`text-sm font-medium ${getCapacityColor(studentCount, maxStudents)}`}>
                      {studentCount}/{maxStudents}
                    </span>
                  </div>

                  {classItem?.teacher && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4" />
                      <span>{classItem.teacher.firstName} {classItem.teacher.lastName}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{classItem?.schoolYear}</span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          studentCount >= maxStudents * 0.9
                            ? 'bg-red-500'
                            : studentCount >= maxStudents * 0.75
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((studentCount / maxStudents) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Taux de remplissage: {Math.round((studentCount / maxStudents) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedClass && (
        <ManageStudentsModal
          classItem={selectedClass}
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          onStudentManaged={() => {
            setSelectedClass(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
}
