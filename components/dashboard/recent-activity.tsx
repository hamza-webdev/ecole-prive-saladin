
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserPlus, BookOpen, Users, Clock, ArrowRight, TrendingUp, Calendar } from 'lucide-react';
import { prisma } from '@/lib/db';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Link from 'next/link';

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
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100',
    })),
    ...recentClasses.map(cls => ({
      id: cls.id,
      type: 'class' as const,
      title: `Nouvelle classe créée`,
      description: cls.name,
      details: cls.teacher ? `Professeur: ${cls.teacher.firstName} ${cls.teacher.lastName}` : 'Aucun professeur assigné',
      date: cls.createdAt,
      icon: BookOpen,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Activité récente */}
      <Card className="card-modern border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-playfair font-bold text-gray-900">Activité Récente</span>
                <p className="text-sm text-gray-500 font-normal">Dernières actions</p>
              </div>
            </CardTitle>
            <Button variant="outline" size="sm" className="btn-outline">
              <Link href="/dashboard/activity" className="flex items-center">
                Voir tout
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Aucune activité récente</p>
                <p className="text-sm text-gray-400">Les nouvelles activités apparaîtront ici</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div key={`${activity.type}-${activity.id}-${index}`} className="group">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                    <div className={`relative p-3 rounded-xl bg-gradient-to-r ${activity.gradient} shadow-lg flex-shrink-0 group-hover:shadow-xl transition-all duration-200`}>
                      <activity.icon className="h-5 w-5 text-white" />
                      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-bold text-gray-900">
                          {activity.title}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-xs border-0 ${
                            activity.type === 'student'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {activity.type === 'student' ? '👨‍🎓 Élève' : '📚 Classe'}
                        </Badge>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {activity.details}
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-400">
                          {format(new Date(activity.date), 'dd MMMM yyyy', { locale: fr })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Résumé des classes */}
      <Card className="card-modern border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-playfair font-bold text-gray-900">Classes Actives</span>
                <p className="text-sm text-gray-500 font-normal">Aperçu des classes</p>
              </div>
            </CardTitle>
            <Button variant="outline" size="sm" className="btn-outline">
              <Link href="/dashboard/classes" className="flex items-center">
                Gérer
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClasses.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Aucune classe disponible</p>
                <p className="text-sm text-gray-400">Créez votre première classe</p>
                <Button className="mt-4 btn-primary">
                  <Link href="/dashboard/classes/new">Créer une classe</Link>
                </Button>
              </div>
            ) : (
              recentClasses.map((cls, index) => (
                <div key={cls.id} className="group">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-emerald-50 hover:to-blue-50 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {cls.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{cls.name}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600">
                            {cls.teacher ? `👨‍🏫 ${cls.teacher.firstName} ${cls.teacher.lastName}` : '⚠️ Aucun professeur'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-white border-emerald-200 text-emerald-700 font-medium"
                      >
                        {cls.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-600">
                          {Math.floor(Math.random() * 30) + 15} élèves
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Call to Action */}
          {recentClasses.length > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl text-center">
              <h4 className="font-bold text-gray-900 mb-2">Gestion Complète</h4>
              <p className="text-sm text-gray-600 mb-4">
                Accédez à toutes les fonctionnalités de gestion des classes
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="sm" className="btn-primary">
                  <Link href="/dashboard/classes">Voir toutes les classes</Link>
                </Button>
                <Button size="sm" variant="outline" className="btn-outline">
                  <Link href="/dashboard/classes/new">Nouvelle classe</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
