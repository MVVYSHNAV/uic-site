import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CinematicHero } from '@/components/sections/CinematicHero';
import { StudioSection } from '@/components/sections/StudioSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { NfcSection } from '@/components/sections/NfcSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { RevealObserver } from '@/components/motion/RevealObserver';

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <CinematicHero />
        <StudioSection />
        <PortfolioSection />
        <ServicesSection />
        <NfcSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
