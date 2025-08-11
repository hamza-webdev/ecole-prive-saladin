
'use client';

import { useState, useEffect } from 'react';
import { ClassesList } from './classes-list';
import { ClassesFilters } from './classes-filters';
import { AddClassModal } from './add-class-modal';
import { ClassWithStudents } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ClassesClientPage() {
  const [classes, setClasses] = useState<ClassWithStudents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    level: 'all',
    schoolYear: '2024-2025',
  });
  const { toast } = useToast();

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.level && filters.level !== 'all') params.append('level', filters.level);
      if (filters.schoolYear) params.append('schoolYear', filters.schoolYear);

      const response = await fetch(`/api/classes?${params}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }
      
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les classes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [filters]);

  const handleClassAdded = () => {
    setIsAddModalOpen(false);
    fetchClasses();
    toast({
      title: 'Succès',
      description: 'La classe a été créée avec succès',
    });
  };

  const handleClassUpdated = () => {
    fetchClasses();
    toast({
      title: 'Succès',
      description: 'La classe a été mise à jour avec succès',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des classes
          </h1>
          <p className="text-gray-600">
            Gérez les classes et affectations d'élèves
          </p>
        </div>
        
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Créer une classe
        </Button>
      </div>

      <ClassesFilters 
        filters={filters}
        onFiltersChange={setFilters}
        isLoading={isLoading}
      />

      <ClassesList
        classes={classes}
        isLoading={isLoading}
        onClassUpdated={handleClassUpdated}
        onRefresh={fetchClasses}
      />

      <AddClassModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onClassAdded={handleClassAdded}
      />
    </div>
  );
}
