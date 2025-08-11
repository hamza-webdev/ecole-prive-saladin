
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Bienvenue, {session?.user?.firstName} {session?.user?.lastName}
        </p>
      </div>
      
      <DashboardStats />
      <RecentActivity />
    </div>
  );
}
