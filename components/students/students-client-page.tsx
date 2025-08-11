
'use client';

import { useState, useEffect } from 'react';
import { StudentsList } from './students-list';
import { StudentsFilters } from './students-filters';
import { AddStudentModal } from './add-student-modal';
import { StudentWithClasses } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function StudentsClientPage() {
  const [students, setStudents] = useState<StudentWithClasses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    classId: 'all',
    isActive: 'true'
  });
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.classId && filters.classId !== 'all') params.append('classId', filters.classId);
      if (filters.isActive && filters.isActive !== 'all') params.append('isActive', filters.isActive);

      const response = await fetch(`/api/students?${params}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }
      
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les élèves',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const handleStudentAdded = () => {
    setIsAddModalOpen(false);
    fetchStudents();
    toast({
      title: 'Succès',
      description: 'L\'élève a été ajouté avec succès',
    });
  };

  const handleStudentUpdated = () => {
    fetchStudents();
    toast({
      title: 'Succès',
      description: 'L\'élève a été mis à jour avec succès',
    });
  };

  const handleStudentDeleted = () => {
    fetchStudents();
    toast({
      title: 'Succès',
      description: 'L\'élève a été supprimé avec succès',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des élèves
          </h1>
          <p className="text-gray-600">
            Gérez les informations des élèves de l'établissement
          </p>
        </div>
        
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un élève
        </Button>
      </div>

      <StudentsFilters 
        filters={filters}
        onFiltersChange={setFilters}
        isLoading={isLoading}
      />

      <StudentsList
        students={students}
        isLoading={isLoading}
        onStudentUpdated={handleStudentUpdated}
        onStudentDeleted={handleStudentDeleted}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
}
