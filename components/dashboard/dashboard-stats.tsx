
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/db';

export async function DashboardStats() {
  // Récupérer les statistiques depuis la base de données
  const [studentsCount, classesCount, teachersCount, activeStudentsCount] = await Promise.all([
    prisma.student.count(),
    prisma.class.count(),
    prisma.user.count({ where: { role: 'TEACHER', isActive: true } }),
    prisma.student.count({ where: { isActive: true } })
  ]);

  const stats = [
    {
      title: 'Total Élèves',
      value: studentsCount,
      description: `${activeStudentsCount} actifs`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Classes',
      value: classesCount,
      description: 'Année 2024-2025',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Professeurs',
      value: teachersCount,
      description: 'Personnel enseignant',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Taux d\'occupation',
      value: `${Math.round((studentsCount / (classesCount * 30)) * 100)}%`,
      description: 'Capacité utilisée',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <p className="text-sm text-gray-500">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
