
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ClassWithStudents, StudentWithClasses } from '@/lib/types';
import { Search, UserPlus, UserMinus, Users } from 'lucide-react';

interface ManageStudentsModalProps {
  classItem: ClassWithStudents;
  isOpen: boolean;
  onClose: () => void;
  onStudentManaged: () => void;
}

export function ManageStudentsModal({ classItem, isOpen, onClose, onStudentManaged }: ManageStudentsModalProps) {
  const { toast } = useToast();
  const [availableStudents, setAvailableStudents] = useState<StudentWithClasses[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableStudents();
    }
  }, [isOpen]);

  const fetchAvailableStudents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/students?isActive=true');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }
      
      const allStudents = await response.json();
      
      // Filtrer les élèves qui ne sont pas déjà dans cette classe
      const currentStudentIds = new Set(
        classItem?.studentClasses?.map(sc => sc?.student?.id) || []
      );
      
      const available = allStudents?.filter?.((student: StudentWithClasses) => 
        !currentStudentIds.has(student?.id)
      ) || [];
      
      setAvailableStudents(available);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les élèves disponibles',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addStudentToClass = async (studentId: string) => {
    try {
      const response = await fetch(`/api/classes/${classItem.id}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'ajout');
      }

      // Actualiser la liste des élèves disponibles
      fetchAvailableStudents();
      onStudentManaged();
      
      toast({
        title: 'Succès',
        description: 'Élève ajouté à la classe avec succès',
      });
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'ajouter l\'élève',
        variant: 'destructive',
      });
    }
  };

  const removeStudentFromClass = async (studentId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir retirer cet élève de la classe ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/classes/${classItem.id}/students`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors du retrait');
      }

      // Actualiser la liste des élèves disponibles
      fetchAvailableStudents();
      onStudentManaged();
      
      toast({
        title: 'Succès',
        description: 'Élève retiré de la classe avec succès',
      });
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de retirer l\'élève',
        variant: 'destructive',
      });
    }
  };

  const filteredAvailableStudents = availableStudents?.filter?.((student) =>
    `${student?.firstName} ${student?.lastName}`
      ?.toLowerCase?.()
      ?.includes?.(searchTerm?.toLowerCase?.() || '') ||
    student?.parentName?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() || '')
  ) || [];

  const currentStudents = classItem?.studentClasses || [];
  const currentCount = currentStudents?.length || 0;
  const maxStudents = classItem?.maxStudents || 30;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gérer les élèves - {classItem?.name}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Capacité: {currentCount}/{maxStudents}</span>
            <Badge variant={currentCount >= maxStudents ? 'destructive' : 'default'}>
              {currentCount >= maxStudents ? 'Classe complète' : `${maxStudents - currentCount} places disponibles`}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Élèves actuels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Élèves dans la classe ({currentCount})
            </h3>
            
            {currentCount === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun élève dans cette classe</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentStudents?.map?.((sc) => (
                  <div
                    key={sc?.student?.id}
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {sc?.student?.firstName} {sc?.student?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Parent: {sc?.student?.parentName}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sc?.student?.id && removeStudentFromClass(sc.student.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Élèves disponibles */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Ajouter des élèves
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un élève..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : filteredAvailableStudents?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aucun élève disponible</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredAvailableStudents?.map?.((student) => (
                  <div
                    key={student?.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {student?.firstName} {student?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Parent: {student?.parentName}
                      </p>
                      {student?.studentClasses?.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {student.studentClasses.map((sc) => (
                            <Badge key={sc?.class?.id} variant="outline" className="text-xs">
                              {sc?.class?.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => student?.id && addStudentToClass(student.id)}
                      disabled={currentCount >= maxStudents}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
