
'use client';

import { Session } from 'next-auth';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';

interface PublicLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export function PublicLayout({ children, session }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader session={session} />
      <main>
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
