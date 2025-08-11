
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, BookOpen, Users } from 'lucide-react';
import { prisma } from '@/lib/db';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function RecentActivity() {
  // Récupérer les élèves récemment inscrits
  const recentStudents = await prisma.student.findMany({
    take: 5,
    orderBy: { enrollmentDate: 'desc' },
    include: {
      studentClasses: {
        include: { class: true }
      }
    }
  });

  // Récupérer les classes récemment créées
  const recentClasses = await prisma.class.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { teacher: true }
  });

  const activities = [
    ...recentStudents.map(student => ({
      id: student.id,
      type: 'student' as const,
      title: `Nouvel élève inscrit`,
      description: `${student.firstName} ${student.lastName}`,
      details: student.studentClasses?.[0]?.class?.name || 'Aucune classe assignée',
      date: student.enrollmentDate,
      icon: UserPlus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    })),
    ...recentClasses.map(cls => ({
      id: cls.id,
      type: 'class' as const,
      title: `Nouvelle classe créée`,
      description: cls.name,
      details: cls.teacher ? `Professeur: ${cls.teacher.firstName} ${cls.teacher.lastName}` : 'Aucun professeur assigné',
      date: cls.createdAt,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Activité récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Aucune activité récente
              </p>
            ) : (
              activities.map((activity, index) => (
                <div key={`${activity.type}-${activity.id}-${index}`} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {activity.type === 'student' ? 'Élève' : 'Classe'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.details}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(activity.date), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-green-600" />
            Résumé des classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClasses.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                Aucune classe disponible
              </p>
            ) : (
              recentClasses.map((cls) => (
                <div key={cls.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{cls.name}</h4>
                    <p className="text-sm text-gray-600">
                      {cls.teacher ? `${cls.teacher.firstName} ${cls.teacher.lastName}` : 'Aucun professeur'}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {cls.level}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
