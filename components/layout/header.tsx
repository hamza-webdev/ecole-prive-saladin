
'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Settings, GraduationCap, Bell, Search } from 'lucide-react';

export function Header() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  const getUserInitials = () => {
    const firstName = session?.user?.firstName || '';
    const lastName = session?.user?.lastName || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo et titre */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl opacity-20 blur-sm"></div>
              <GraduationCap className="relative h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-playfair font-bold text-gradient bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                École Saladin
              </h1>
              <p className="text-sm text-gray-500 font-medium">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Barre de recherche centrale */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un élève, une classe..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {session?.user && (
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Message de bienvenue */}
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {session.user.firstName} {session.user.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {session.user.role === 'ADMIN' && 'Administrateur'}
                {session.user.role === 'TEACHER' && 'Professeur'}
                {session.user.role === 'STAFF' && 'Personnel'}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-blue-200 transition-all duration-200"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold text-lg">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {session.user.firstName} {session.user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit">
                        {session.user.role === 'ADMIN' && 'Administrateur'}
                        {session.user.role === 'TEACHER' && 'Professeur'}
                        {session.user.role === 'STAFF' && 'Personnel'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-blue-50 rounded-lg">
                  <User className="mr-3 h-4 w-4 text-blue-600" />
                  <span>Mon Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer hover:bg-emerald-50 rounded-lg">
                  <Settings className="mr-3 h-4 w-4 text-emerald-600" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="p-3 cursor-pointer hover:bg-red-50 rounded-lg text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
