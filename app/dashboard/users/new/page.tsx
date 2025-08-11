
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default async function NewUserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Nouvel utilisateur
        </h1>
        <p className="text-gray-600">
          Créer un nouveau compte utilisateur
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Fonctionnalité en développement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            La création d'utilisateurs sera disponible dans une prochaine version.
            Pour l'instant, vous pouvez utiliser l'API signup directement.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
