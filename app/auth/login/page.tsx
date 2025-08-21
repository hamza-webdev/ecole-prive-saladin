
import { LoginForm } from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Shield, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/10 rounded-full blur-xl"></div>
      </div>

      {/* Grille subtile */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Section gauche - Présentation */}
          <div className="text-white space-y-8 lg:pr-12">
            {/* Logo et titre */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                <GraduationCap className="relative h-16 w-16 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-playfair font-bold">École Saladin</h1>
                <p className="text-xl text-blue-100">Excellence & Innovation</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-playfair font-bold">
                Plateforme de Gestion Éducative
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Accédez à votre espace personnel pour gérer les élèves, les classes,
                et suivre les performances académiques de notre école d'excellence.
              </p>
            </div>

            {/* Fonctionnalités */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-100">Gestion des élèves</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-100">Suivi des classes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-100">Sécurité avancée</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-blue-100">Rapports détaillés</span>
              </div>
            </div>

            {/* Lien retour */}
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center text-blue-200 hover:text-white transition-colors"
              >
                ← Retour au site principal
              </Link>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="w-full max-w-md mx-auto">
            <Card className="card-modern border-0 shadow-2xl backdrop-blur-sm bg-white/95">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-playfair font-bold text-gray-900">
                  Connexion
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Accédez à votre espace personnel sécurisé
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <LoginForm />
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 text-blue-200">
              <p className="text-sm">
                © 2024 École Saladin - Tous droits réservés
              </p>
              <p className="text-xs mt-1 opacity-80">
                Plateforme sécurisée et confidentielle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
