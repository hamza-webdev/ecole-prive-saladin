
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

interface ClassesFiltersProps {
  filters: {
    search: string;
    level: string;
    schoolYear: string;
  };
  onFiltersChange: (filters: any) => void;
  isLoading: boolean;
}

const schoolYears = ['2023-2024', '2024-2025', '2025-2026'];
const levels = ['6ème', '5ème', '4ème', '3ème', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];

export function ClassesFilters({ filters, onFiltersChange, isLoading }: ClassesFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

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
      level: 'all',
      schoolYear: '2024-2025'
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
              placeholder="Nom de classe, niveau..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Niveau
          </label>
          <Select
            value={filters.level}
            onValueChange={(value) => onFiltersChange({ ...filters, level: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les niveaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les niveaux</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Année scolaire
          </label>
          <Select
            value={filters.schoolYear}
            onValueChange={(value) => onFiltersChange({ ...filters, schoolYear: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {schoolYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
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
