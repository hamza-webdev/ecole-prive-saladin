
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export default async function TeachersPage() {
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
          Gestion des professeurs
        </h1>
        <p className="text-gray-600">
          Gérer l'équipe enseignante
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Interface en développement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            La gestion des professeurs sera disponible dans une prochaine version.
            Les professeurs peuvent être créés via l'API signup avec le rôle TEACHER.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
