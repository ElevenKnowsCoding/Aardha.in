import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ArshNav        from './sections/ArshNav';
import ArshHero       from './sections/ArshHero';
import ArshAbout      from './sections/ArshAbout';
import ArshWhyUs      from './sections/ArshWhyUs';
import ArshDirector   from './sections/ArshDirector';
import ArshContact    from './sections/ArshContact';
import ArshFooter     from './sections/ArshFooter';

gsap.registerPlugin(ScrollTrigger);

export default function ArshApp() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen overflow-x-hidden">
      {/* Noise overlay — same as Aardha */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]" />

      <ArshNav />
      <main>
        <ArshHero />
        <ArshAbout />
        <ArshWhyUs />
        <ArshDirector />
        <ArshContact />
      </main>
      <ArshFooter />
    </div>
  );
}
