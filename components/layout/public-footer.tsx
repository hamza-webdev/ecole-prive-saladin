
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Twitter, ArrowRight, Heart, Star } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative section-container py-20">
        {/* Call to Action en haut du footer */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-12 mb-12">
            <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-6">
              Rejoignez l'Excellence Éducative
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Découvrez comment l'École Saladin peut accompagner votre enfant vers la réussite académique et personnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-secondary group">
                <Link href="#contact" className="flex items-center">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="tel:+21671123456">Appelez-nous</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl opacity-20 blur-sm"></div>
                <GraduationCap className="relative h-12 w-12 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  École Saladin
                </h3>
                <p className="text-gray-400 font-medium">Excellence & Innovation</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              École privée d'excellence dédiée à la formation des leaders de demain.
              Nous allions tradition arabe et innovation pédagogique pour offrir une éducation de qualité supérieure.
            </p>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">20+</div>
                <div className="text-xs text-gray-400">Ans d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">450+</div>
                <div className="text-xs text-gray-400">Élèves</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">98%</div>
                <div className="text-xs text-gray-400">Réussite</div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 transition-all duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-pink-900/20 transition-all duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 transition-all duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xl font-playfair font-bold mb-6 text-white">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#accueil" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#apropos" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#actualites" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Actualités
                </Link>
              </li>
              <li>
                <Link href="#evenements" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center group">
                  <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Espace Privé
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-playfair font-bold mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    123 Avenue Habib Bourguiba<br />
                    1000 Tunis, Tunisie
                  </div>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <a href="tel:+21671123456" className="text-gray-300 text-sm hover:text-emerald-400 transition-colors">
                  +216 71 123 456
                </a>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>
                <a href="mailto:contact@ecole-saladin.tn" className="text-gray-300 text-sm hover:text-purple-400 transition-colors">
                  contact@ecole-saladin.tn
                </a>
              </li>
            </ul>

            {/* Horaires */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
              <h5 className="text-white font-medium mb-2">Horaires d'ouverture</h5>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Lun - Ven: 7:30 - 17:00</div>
                <div>Samedi: 8:00 - 12:00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 École Saladin. Tous droits réservés.
              </p>
              <Heart className="h-4 w-4 text-red-400" />
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link>
              <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-amber-400" />
                <span>Excellence certifiée</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
