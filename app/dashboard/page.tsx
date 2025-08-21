
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Bonjour';
    if (currentHour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="space-y-8">
      {/* Header avec gradient */}
      <div className="relative">
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-600 rounded-3xl p-8 text-white overflow-hidden">
          {/* Motifs décoratifs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-playfair font-bold mb-2">
                  {getGreeting()} ! 👋
                </h1>
                <p className="text-xl text-blue-100 mb-1">
                  {session?.user?.firstName} {session?.user?.lastName}
                </p>
                <p className="text-blue-200">
                  {session?.user?.role === 'ADMIN' && 'Administrateur de l\'École Saladin'}
                  {session?.user?.role === 'TEACHER' && 'Professeur à l\'École Saladin'}
                  {session?.user?.role === 'STAFF' && 'Personnel de l\'École Saladin'}
                </p>
              </div>

              {/* Statistiques rapides */}
              <div className="hidden lg:flex space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {new Date().toLocaleDateString('fr-FR', { day: 'numeric' })}
                  </div>
                  <div className="text-sm text-blue-200">
                    {new Date().toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </div>
                  <div className="text-sm text-blue-200">
                    Aujourd'hui
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DashboardStats />
      <RecentActivity />
    </div>
  );
}
