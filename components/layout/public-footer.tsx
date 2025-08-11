
'use client';

import Link from 'next/link';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">École Saladin</h3>
                <p className="text-sm text-gray-400">Excellence Éducative</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              École privée arabe tunisienne dédiée à l'excellence éducative et au développement 
              intégral de nos élèves dans un environnement bienveillant et stimulant.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link href="#accueil" className="text-gray-300 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="#apropos" className="text-gray-300 hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="#actualites" className="text-gray-300 hover:text-white transition-colors">Actualités</Link></li>
              <li><Link href="#evenements" className="text-gray-300 hover:text-white transition-colors">Événements</Link></li>
              <li><Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">Espace Privé</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">123 Avenue Habib Bourguiba, Tunis</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">+216 71 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">contact@ecole-saladin.tn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 École Saladin. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
