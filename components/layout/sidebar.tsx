
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  GraduationCap, 
  Home, 
  BookOpen,
  Settings,
  UserPlus,
} from 'lucide-react';

const navigation = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: Home,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
  },
  {
    name: 'Gestion des élèves',
    href: '/dashboard/students',
    icon: Users,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
  },
  {
    name: 'Gestion des classes',
    href: '/dashboard/classes',
    icon: BookOpen,
    roles: ['ADMIN', 'TEACHER'],
  },
  {
    name: 'Professeurs',
    href: '/dashboard/teachers',
    icon: GraduationCap,
    roles: ['ADMIN'],
  },
  {
    name: 'Nouvel utilisateur',
    href: '/dashboard/users/new',
    icon: UserPlus,
    roles: ['ADMIN'],
  },
  {
    name: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
  },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session?.user) {
    return null;
  }

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(session.user.role)
  );

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="text-sm text-gray-600">
            {session.user.role === 'ADMIN' && 'Administration'}
            {session.user.role === 'TEACHER' && 'Espace Professeur'}
            {session.user.role === 'STAFF' && 'Personnel'}
          </div>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-blue-100 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
