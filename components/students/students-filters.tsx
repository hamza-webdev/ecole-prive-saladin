
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface StudentsFiltersProps {
  filters: {
    search: string;
    classId: string;
    isActive: string;
  };
  onFiltersChange: (filters: any) => void;
  isLoading: boolean;
}

interface ClassOption {
  id: string;
  name: string;
}

export function StudentsFilters({ filters, onFiltersChange, isLoading }: StudentsFiltersProps) {
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    // Fetch classes for filter
    fetch('/api/classes')
      .then(res => res.json())
      .then(data => setClasses(data || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: localSearch });
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const clearFilters = () => {
    setLocalSearch('');
    onFiltersChange({
      search: '',
      classId: 'all',
      isActive: 'true'
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Nom, prénom, parent..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Classe
          </label>
          <Select
            value={filters.classId}
            onValueChange={(value) => onFiltersChange({ ...filters, classId: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Statut
          </label>
          <Select
            value={filters.isActive}
            onValueChange={(value) => onFiltersChange({ ...filters, isActive: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="true">Actifs</SelectItem>
              <SelectItem value="false">Inactifs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Effacer
          </Button>
        </div>
      </div>
    </div>
  );
}
