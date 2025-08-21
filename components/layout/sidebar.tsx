
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
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
} from 'lucide-react';

const navigation = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: Home,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
    color: 'from-blue-500 to-blue-600',
    description: 'Vue d\'ensemble'
  },
  {
    name: 'Élèves',
    href: '/dashboard/students',
    icon: Users,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
    color: 'from-emerald-500 to-emerald-600',
    description: 'Gestion des élèves'
  },
  {
    name: 'Classes',
    href: '/dashboard/classes',
    icon: BookOpen,
    roles: ['ADMIN', 'TEACHER'],
    color: 'from-purple-500 to-purple-600',
    description: 'Gestion des classes'
  },
  {
    name: 'Professeurs',
    href: '/dashboard/teachers',
    icon: GraduationCap,
    roles: ['ADMIN'],
    color: 'from-amber-500 to-amber-600',
    description: 'Corps enseignant'
  },
  {
    name: 'Statistiques',
    href: '/dashboard/analytics',
    icon: BarChart3,
    roles: ['ADMIN', 'TEACHER'],
    color: 'from-rose-500 to-rose-600',
    description: 'Analyses et rapports'
  },
  {
    name: 'Planning',
    href: '/dashboard/schedule',
    icon: Calendar,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
    color: 'from-indigo-500 to-indigo-600',
    description: 'Emplois du temps'
  },
  {
    name: 'Nouvel utilisateur',
    href: '/dashboard/users/new',
    icon: UserPlus,
    roles: ['ADMIN'],
    color: 'from-teal-500 to-teal-600',
    description: 'Ajouter un utilisateur'
  },
  {
    name: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['ADMIN', 'TEACHER', 'STAFF'],
    color: 'from-gray-500 to-gray-600',
    description: 'Configuration'
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
    <div className="hidden md:flex md:w-80 md:flex-col">
      <div className="flex flex-col flex-grow pt-6 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 overflow-y-auto">
        {/* Header de la sidebar */}
        <div className="flex items-center flex-shrink-0 px-6 mb-8">
          <div className="w-full">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Navigation
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4">
              <div className="text-sm font-bold text-gray-900">
                {session.user.role === 'ADMIN' && '🛡️ Administration'}
                {session.user.role === 'TEACHER' && '👨‍🏫 Espace Professeur'}
                {session.user.role === 'STAFF' && '👥 Personnel'}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {session.user.firstName} {session.user.lastName}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden',
                    isActive
                      ? 'bg-gradient-to-r text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:transform hover:scale-[1.01]'
                  )}
                  style={isActive ? { backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` } : {}}
                >
                  {/* Effet de gradient pour l'élément actif */}
                  {isActive && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-100`}
                      style={{ borderRadius: '0.75rem' }}
                    />
                  )}

                  {/* Contenu */}
                  <div className="relative flex items-center w-full">
                    <div className={cn(
                      'p-2 rounded-lg mr-3 transition-all duration-200',
                      isActive
                        ? 'bg-white/20 backdrop-blur-sm'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    )}>
                      <item.icon
                        className={cn(
                          'h-5 w-5 transition-all duration-200',
                          isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <div className={cn(
                        'font-semibold',
                        isActive ? 'text-white' : 'text-gray-900'
                      )}>
                        {item.name}
                      </div>
                      <div className={cn(
                        'text-xs',
                        isActive ? 'text-white/80' : 'text-gray-500'
                      )}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer de la sidebar */}
          <div className="p-4 mt-8">
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4 text-center">
              <div className="text-sm font-semibold text-gray-900 mb-1">
                École Saladin
              </div>
              <div className="text-xs text-gray-600">
                Excellence & Innovation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
