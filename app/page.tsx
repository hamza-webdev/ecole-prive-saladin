
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { PublicLayout } from '@/components/layout/public-layout';
import { HeroSection } from '@/components/public/hero-section';
import { AboutSection } from '@/components/public/about-section';
import { StatsSection } from '@/components/public/stats-section';
import { NewsSection } from '@/components/public/news-section';
import { EventsSection } from '@/components/public/events-section';
import { ContactSection } from '@/components/public/contact-section';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  return (
    <PublicLayout session={session}>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <NewsSection />
      <EventsSection />
      <ContactSection />
    </PublicLayout>
  );
}
