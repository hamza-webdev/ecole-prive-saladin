
'use client';

import { useState, useEffect } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap, LogIn, ChevronDown, BookOpen, Users, Calendar, Phone } from 'lucide-react';

interface PublicHeaderProps {
  session: Session | null;
}

const navigation = [
  {
    name: 'Accueil',
    href: '#accueil',
    icon: GraduationCap
  },
  {
    name: 'École',
    href: '#apropos',
    icon: BookOpen,
    submenu: [
      { name: 'À propos', href: '#apropos' },
      { name: 'Notre mission', href: '#mission' },
      { name: 'Équipe pédagogique', href: '#equipe' },
      { name: 'Infrastructures', href: '#infrastructures' },
    ]
  },
  {
    name: 'Programmes',
    href: '#programmes',
    icon: Users,
    submenu: [
      { name: 'Maternelle', href: '#maternelle' },
      { name: 'Primaire', href: '#primaire' },
      { name: 'Collège', href: '#college' },
      { name: 'Lycée', href: '#lycee' },
    ]
  },
  {
    name: 'Actualités',
    href: '#actualites',
    icon: Calendar
  },
  {
    name: 'Contact',
    href: '#contact',
    icon: Phone
  },
];

export function PublicHeader({ session }: PublicHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <nav className="section-container" aria-label="Navigation principale">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <GraduationCap className="relative h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h1 className="text-2xl font-playfair font-bold text-gradient">École Saladin</h1>
                <p className="text-sm text-gray-600 font-medium">Excellence & Innovation</p>
              </div>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 cursor-pointer rounded-lg hover:bg-blue-50"
                    onMouseEnter={() => setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && activeSubmenu === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                    onMouseEnter={() => setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <Button asChild className="btn-primary">
                <Link href="/dashboard">
                  <LogIn className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="outline" className="btn-outline">
                  <Link href="/auth/login">
                    Connexion
                  </Link>
                </Button>
                <Button asChild className="btn-primary">
                  <Link href="#contact">
                    Nous contacter
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-10"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`} />
                <span className={`absolute block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`absolute block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="section-container py-6">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                  {item.submenu && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6 mt-6 border-t border-gray-200 space-y-3">
                {session ? (
                  <Button asChild className="w-full btn-primary">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <LogIn className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button asChild variant="outline" className="w-full btn-outline">
                      <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                        Connexion
                      </Link>
                    </Button>
                    <Button asChild className="w-full btn-primary">
                      <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                        Nous contacter
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
