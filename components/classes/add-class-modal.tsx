
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CreateClassData, UserWithClasses } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClassAdded: () => void;
}

const levels = ['CP', 'CE1', 'CE2', 'CM1', 'CM2', '6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Terminale'];
const sections = ['A', 'B', 'C', 'D', 'S', 'ES', 'L'];

export function AddClassModal({ isOpen, onClose, onClassAdded }: AddClassModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teachers, setTeachers] = useState<UserWithClasses[]>([]);
  const [formData, setFormData] = useState<CreateClassData>({
    name: '',
    level: '',
    section: '',
    schoolYear: '2024-2025',
    maxStudents: 30,
    teacherId: '',
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch teachers
      fetch('/api/users?role=TEACHER')
        .then(res => res.json())
        .then(data => setTeachers(data || []))
        .catch(console.error);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate class name if not provided
      const className = formData.name || `${formData.level}${formData.section ? ' ' + formData.section : ''}`;

      const classData = {
        ...formData,
        name: className,
        teacherId: formData.teacherId || undefined,
      };

      const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la création');
      }

      onClassAdded();
      resetForm();
    } catch (error: any) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de créer la classe',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: '',
      section: '',
      schoolYear: '2024-2025',
      maxStudents: 30,
      teacherId: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const updateClassName = () => {
    if (!formData.name && formData.level) {
      const generatedName = `${formData.level}${formData.section ? ' ' + formData.section : ''}`;
      setFormData({ ...formData, name: generatedName });
    }
  };

  useEffect(() => {
    updateClassName();
  }, [formData.level, formData.section]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle classe</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="level">Niveau *</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
                disabled={isSubmitting}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Select
                value={formData.section || 'none'}
                onValueChange={(value) => setFormData({ ...formData, section: value === 'none' ? '' : value })}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Aucune" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune section</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom de la classe</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
              placeholder="Ex: 6ème A, CP, CM2..."
            />
            <p className="text-xs text-gray-500">
              Si vide, sera généré automatiquement à partir du niveau et de la section
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolYear">Année scolaire *</Label>
            <Select
              value={formData.schoolYear}
              onValueChange={(value) => setFormData({ ...formData, schoolYear: value })}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2025-2026">2025-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxStudents">Capacité maximale</Label>
            <Input
              id="maxStudents"
              type="number"
              min="1"
              max="50"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: parseInt(e.target.value) || 30 })}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacherId">Professeur principal</Label>
            <Select
              value={formData.teacherId || 'none'}
              onValueChange={(value) => setFormData({ ...formData, teacherId: value === 'none' ? '' : value })}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Aucun professeur assigné" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun professeur</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher?.id} value={teacher?.id || `teacher-${teacher?.email}`}>
                    {teacher?.firstName} {teacher?.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Créer la classe
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
