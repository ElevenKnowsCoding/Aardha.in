import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Globe, Wrench, Shield, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C8A951';

const panels = [
  {
    label: 'Proven Quality',
    stat: '20+', statLabel: 'Years of Excellence',
    icon: <Star className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    desc: "Aardha's products are trusted by Indian Railways, metro systems, and major infrastructure contractors across India. Every component is manufactured to ISO 9001:2015 standards and rigorously tested before dispatch.",
    features: ['ISO 9001:2015 certified', 'Trusted by 500+ clients', 'Rigorous QC processes', 'Consistent performance'],
  },
  {
    label: 'UK-Based Support',
    stat: '1', statLabel: 'Dedicated UK Contact',
    icon: <Globe className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    desc: 'As your local UK partner, Shafi Ghafari provides direct communication, technical support, and reliable service from London. No time-zone barriers, no language barriers — just professional, responsive support.',
    features: ['London-based director', 'Direct communication', 'Technical consultation', 'End-to-end management'],
  },
];

const extras = [
  { icon: <Wrench className="w-5 h-5" />, title: 'Custom Manufacturing', desc: 'Send us your drawings or samples — we develop the perfect part for your application.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Cost-Effective',        desc: 'World-class Indian manufacturing at competitive prices, without compromising quality.' },
  { icon: <Globe className="w-5 h-5" />,  title: 'Material Expertise',    desc: 'Guidance on Neoprene, EPDM, Silicone, Viton, Natural Rubber and more.' },
];

export default function ArshWhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const panelsRef  = useRef<HTMLDivElement>(null);
  const extrasRef  = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(panelsRef.current?.querySelectorAll('.benefit-panel') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: panelsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(extrasRef.current?.querySelectorAll('.extra-card') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: extrasRef.current, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A951]/25 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-[0.06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8A951]/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-16">

        {/* Header */}
        <div ref={headRef} className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] mb-5 font-medium" style={{ color: `${GOLD}80` }}>Why Choose Us</p>
            <h2 className="text-5xl md:text-6xl font-bold font-display leading-[0.95] tracking-tight">
              The right partner<br />
              for <span style={{ color: GOLD }}>UK industry.</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed border-l-2 pl-6 lg:pb-2" style={{ borderColor: `${GOLD}35` }}>
            Manufacturing excellence from India, delivered with professional UK-based support — giving you the best of both worlds.
          </p>
        </div>

        {/* Benefit panels */}
        <div ref={panelsRef} className="space-y-5">
          {panels.map((b, i) => (
            <div key={i}
              className={`benefit-panel group relative rounded-3xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-500 flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

              {/* Image side */}
              <div className="lg:w-[44%] flex-shrink-0 relative h-60 lg:h-auto min-h-[260px]">
                <img src={b.image} alt={b.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-gradient-to-r from-transparent to-[#0A0A0A]' : 'bg-gradient-to-l from-transparent to-[#0A0A0A]'} hidden lg:block`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent lg:hidden" />
                <div className="absolute top-6 left-6">
                  <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
                    <p className="font-black text-4xl font-display leading-none" style={{ color: GOLD }}>{b.stat}</p>
                    <p className="text-gray-400 text-xs mt-1">{b.statLabel}</p>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center gap-5 bg-[#0f0f0f]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${GOLD}18`, color: GOLD }}>
                    {b.icon}
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: GOLD }}>{b.label}</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {b.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GOLD}20` }}>
                        <Check className="w-3 h-3" style={{ color: GOLD }} />
                      </div>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${GOLD}35, transparent)` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Extras strip */}
        <div ref={extrasRef} className="grid md:grid-cols-3 gap-4 mt-5">
          {extras.map((item, i) => (
            <div key={i}
              className="extra-card flex items-start gap-4 bg-[#111] border border-white/6 rounded-2xl px-6 py-5 transition-all duration-300"
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}25`; e.currentTarget.style.backgroundColor = '#141414'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.backgroundColor = '#111'; }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${GOLD}15`, color: GOLD }}>
                {item.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-5 rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6 border"
          style={{ background: `linear-gradient(to right, ${GOLD}10, transparent)`, borderColor: `${GOLD}20` }}>
          <div>
            <p className="text-white font-bold text-xl font-display">Ready to discuss your project?</p>
            <p className="text-gray-500 text-sm mt-1">Contact us for a quote or technical consultation.</p>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-black flex-shrink-0 transition-colors"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8993f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}>
            Contact Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A951]/25 to-transparent mt-16" />
    </section>
  );
}
