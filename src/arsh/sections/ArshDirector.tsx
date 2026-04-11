import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Globe2, Award, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C8A951';

const credentials = [
  { icon: <GraduationCap className="w-4 h-4" />, title: 'MSc Biomedical Sciences', desc: 'Middlesex University, London' },
  { icon: <Briefcase className="w-4 h-4" />,     title: 'CEO, Digi Prime Ltd',      desc: 'Technology & Digital Services' },
  { icon: <Award className="w-4 h-4" />,         title: 'Pharmacovigilance Associate', desc: 'Precision & compliance expertise' },
  { icon: <Globe2 className="w-4 h-4" />,        title: 'Fluent in Dutch & English', desc: 'Direct European client support' },
];

export default function ArshDirector() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(rightRef.current,
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="director" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* SVG grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none">
        <defs>
          <pattern id="dir-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C8A951" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dir-grid)" />
      </svg>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8A951]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — bio */}
          <div ref={leftRef} className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: `${GOLD}80` }}>
                Meet the Director
              </p>
              <h2 className="text-5xl md:text-6xl font-bold font-display leading-tight">
                Shafi <span style={{ color: GOLD }}>Ghafari</span>
              </h2>
              <p className="text-gray-500 text-base mt-2">Director, Arsh Solution Ltd · London</p>
              <div className="w-14 h-0.5 mt-5" style={{ backgroundColor: GOLD }} />
            </div>

            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                Based in London, Shafi personally oversees every client relationship at Arsh Solution Ltd.
                His background spans biomedical sciences, technology leadership, and pharmaceutical compliance —
                disciplines that demand the same rigorous attention to detail required in precision manufacturing.
              </p>
              <p>
                Shafi established Arsh Solution Ltd to bridge the gap between world-class Indian rubber
                manufacturing and the UK's demanding infrastructure and engineering sectors. Fluent in Dutch
                and English, he provides direct, professional support to all UK and European clients.
              </p>
            </div>

            <a href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 font-semibold text-sm transition-all hover:gap-3"
              style={{ color: GOLD }}>
              Get in touch with Shafi <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right — credentials card */}
          <div ref={rightRef}>
            <div className="glass-dark rounded-3xl border border-white/8 overflow-hidden">

              {/* Monogram header */}
              <div className="relative px-8 pt-10 pb-8 flex items-center gap-6"
                style={{ background: `linear-gradient(135deg, ${GOLD}15, transparent)` }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10"
                  style={{ background: `linear-gradient(135deg, ${GOLD}25, ${GOLD}08)` }}>
                  <span className="font-black text-3xl font-display" style={{ color: GOLD }}>SG</span>
                </div>
                <div>
                  <p className="text-white font-bold text-xl font-display">Shafi Ghafari</p>
                  <p className="text-gray-400 text-sm mt-0.5">Director, Arsh Solution Ltd</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-gray-500 text-xs">Available for consultation</p>
                  </div>
                </div>
                <div className="absolute top-5 right-5 rounded-lg px-3 py-1.5" style={{ backgroundColor: `${GOLD}20`, border: `1px solid ${GOLD}30` }}>
                  <p className="text-xs font-semibold" style={{ color: GOLD }}>London, UK</p>
                </div>
              </div>

              <div className="h-px mx-8" style={{ background: `linear-gradient(to right, ${GOLD}25, transparent)` }} />

              {/* Credentials */}
              <div className="px-8 py-6 space-y-1">
                <p className="text-xs uppercase tracking-widest font-medium mb-4" style={{ color: `${GOLD}70` }}>
                  Background & Credentials
                </p>
                {credentials.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${GOLD}15`, color: GOLD }}>
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium leading-snug">{c.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-8 pb-8">
                <a href="#contact"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="block w-full text-center py-3.5 rounded-xl font-semibold text-sm text-black transition-colors"
                  style={{ backgroundColor: GOLD }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8993f')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}>
                  Contact Shafi Directly
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
