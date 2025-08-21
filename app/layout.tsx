import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'École Saladin - Excellence Éducative',
  description: 'École privée d\'excellence - Formation bilingue arabe-français, programmes internationaux et innovation pédagogique',
  keywords: 'école privée, éducation bilingue, programmes internationaux, excellence académique, formation complète',
  authors: [{ name: 'École Saladin' }],
  creator: 'École Saladin',
  publisher: 'École Saladin',
  openGraph: {
    title: 'École Saladin - Excellence Éducative',
    description: 'École privée d\'excellence - Formation bilingue arabe-français, programmes internationaux et innovation pédagogique',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'École Saladin - Excellence Éducative',
    description: 'École privée d\'excellence - Formation bilingue arabe-français, programmes internationaux et innovation pédagogique',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}