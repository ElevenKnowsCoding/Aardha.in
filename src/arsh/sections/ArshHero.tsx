import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronDown } from 'lucide-react';

const GOLD = '#C8A951';

const pills = ['Metro & Rail', 'Highway & Bridge', 'Dam & Water', 'Airport', 'Pharmaceutical'];

export default function ArshHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(badgeRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.1 }
      );
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.querySelectorAll('.line'),
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'expo.out', delay: 0.25 }
        );
      }
      gsap.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.75 }
      );
      gsap.fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.95 }
      );
      gsap.fromTo(rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.4 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">

      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-[0.07]" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#C8A951]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C8A951]/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Vertical line accent */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C8A951]/10 to-transparent hidden lg:block" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">

          {/* LEFT — headline */}
          <div className="flex flex-col gap-8">
            <p ref={badgeRef} className="text-xs uppercase tracking-[0.45em] font-medium opacity-0"
              style={{ color: GOLD }}>
              UK Partner · Aardha Enterprises India
            </p>

            <h1 ref={headingRef}
              className="font-bold font-display leading-[0.92] tracking-tight text-5xl md:text-6xl lg:text-[5.5rem]">
              <span className="line block overflow-hidden text-white">Precision</span>
              <span className="line block overflow-hidden text-white">Rubber</span>
              <span className="line block overflow-hidden" style={{ color: GOLD }}>Components</span>
              <span className="line block overflow-hidden text-white">for UK Industry</span>
            </h1>

            <p ref={subRef} className="text-gray-400 text-lg leading-relaxed max-w-lg opacity-0">
              Arsh Solution Ltd — exclusive UK partner for Aardha Enterprises. Over 20 years of
              precision rubber manufacturing, delivered direct to British clients.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <button onClick={() => scrollTo('#contact')}
                className="magnetic-btn group flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base text-black glow transition-all hover:scale-105"
                style={{ backgroundColor: GOLD }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8993f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}>
                Get a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scrollTo('#about')}
                className="border border-white/15 text-white px-8 py-4 rounded-full font-semibold text-base hover:border-[#C8A951]/50 hover:text-[#C8A951] transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT — info card stack */}
          <div ref={rightRef} className="flex flex-col gap-5 opacity-0">

            {/* Main card */}
            <div className="glass-dark rounded-3xl p-8 border border-white/8">
              <p className="text-xs uppercase tracking-[0.3em] mb-6 font-medium" style={{ color: `${GOLD}99` }}>
                What We Do
              </p>
              <p className="text-white text-xl font-semibold leading-snug mb-4">
                Bridging world-class Indian manufacturing with UK infrastructure & engineering.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                From metro rail to pharmaceutical — we supply precision rubber parts manufactured
                by Aardha Enterprises, backed by dedicated UK-based support.
              </p>

              {/* Divider */}
              <div className="w-full h-px my-6 bg-gradient-to-r from-transparent via-[#C8A951]/20 to-transparent" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: '20+', label: 'Years' },
                  { val: '500+', label: 'Clients' },
                  { val: '26+', label: 'Products' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold font-display" style={{ color: GOLD }}>{s.val}</p>
                    <p className="text-gray-600 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries pill row */}
            <div className="glass-dark rounded-2xl px-6 py-5 border border-white/6">
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">Industries Served</p>
              <div className="flex flex-wrap gap-2">
                {pills.map((p, i) => (
                  <span key={i}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium"
                    style={{ borderColor: `${GOLD}30`, color: `${GOLD}cc`, backgroundColor: `${GOLD}0a` }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* ISO badge */}
            <div className="flex items-center gap-4 rounded-2xl px-6 py-4 border"
              style={{ borderColor: `${GOLD}20`, background: `linear-gradient(135deg, ${GOLD}0d, transparent)` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs text-black"
                style={{ backgroundColor: GOLD }}>ISO
              </div>
              <div>
                <p className="text-white text-sm font-semibold">ISO 9001:2015 Certified</p>
                <p className="text-gray-500 text-xs">Aardha Enterprises manufacturing facility</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-600 text-xs uppercase tracking-widest hidden lg:block">Scroll</span>
        <ChevronDown className="w-4 h-4" style={{ color: GOLD }} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
