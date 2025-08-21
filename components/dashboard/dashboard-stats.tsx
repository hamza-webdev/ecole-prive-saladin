
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { prisma } from '@/lib/db';

export async function DashboardStats() {
  // Récupérer les statistiques depuis la base de données
  const [studentsCount, classesCount, teachersCount, activeStudentsCount] = await Promise.all([
    prisma.student.count(),
    prisma.class.count(),
    prisma.user.count({ where: { role: 'TEACHER', isActive: true } }),
    prisma.student.count({ where: { isActive: true } })
  ]);

  const occupationRate = Math.round((studentsCount / (classesCount * 30)) * 100);

  const stats = [
    {
      title: 'Total Élèves',
      value: studentsCount,
      description: `${activeStudentsCount} actifs`,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      change: '+12%',
      changeType: 'positive',
      trend: 'up'
    },
    {
      title: 'Classes Actives',
      value: classesCount,
      description: 'Année 2024-2025',
      icon: BookOpen,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
      change: '+2',
      changeType: 'positive',
      trend: 'up'
    },
    {
      title: 'Corps Enseignant',
      value: teachersCount,
      description: 'Professeurs actifs',
      icon: GraduationCap,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      change: '+3',
      changeType: 'positive',
      trend: 'up'
    },
    {
      title: 'Taux d\'Occupation',
      value: `${occupationRate}%`,
      description: 'Capacité utilisée',
      icon: TrendingUp,
      gradient: occupationRate > 80 ? 'from-amber-500 to-amber-600' : 'from-emerald-500 to-emerald-600',
      bgGradient: occupationRate > 80 ? 'from-amber-50 to-amber-100' : 'from-emerald-50 to-emerald-100',
      change: occupationRate > 80 ? 'Élevé' : 'Optimal',
      changeType: occupationRate > 80 ? 'warning' : 'positive',
      trend: occupationRate > 80 ? 'up' : 'stable'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="group">
          <Card className="card-modern card-hover h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`}></div>

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-sm font-bold text-gray-700 mb-1">
                  {stat.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    stat.changeType === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                    stat.changeType === 'warning' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                  {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-emerald-600" />}
                  {stat.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-600" />}
                </div>
              </div>

              <div className={`relative p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <stat.icon className="h-6 w-6 text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                {stat.description}
              </p>

              {/* Barre de progression décorative */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: index === 0 ? '85%' :
                           index === 1 ? '70%' :
                           index === 2 ? '90%' :
                           `${Math.min(occupationRate, 100)}%`
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
