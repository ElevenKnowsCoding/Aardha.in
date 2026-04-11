import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Shield, Volume2, Activity, Settings, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    id: 1,
    label: 'Equipment Longevity',
    stat: '3x',
    statLabel: 'Longer Lifespan',
    description:
      'Constant movement and wear will affect any units associated, potentially causing failure at the source or further down the line. Our Vibration Control Products are specifically designed for applications that include National Highway, Metro, Airport and Dam projects.',
    features: [
      'Reduces mechanical stress',
      'Preserves equipment life',
      'Isolates vibration forces',
      'Minimizes maintenance costs',
    ],
    image: '/images/products/04_bridge_bearing_rubber_parts.png',
    icon: <Settings className="w-6 h-6" />,
    accent: '#FFD700',
  },
  {
    id: 2,
    label: 'Operator Comfort',
    stat: '60%',
    statLabel: 'Noise Reduction',
    description:
      'Whether on the shop floor or inside heavy equipment, the smooth operation of machinery is important for worker comfort and health and safety. With the growing trend to use heavy equipment cabs as high-tech work spaces.',
    features: [
      'Minimizes sound levels',
      'Reduces vibration transmission',
      'Improves workspace ergonomics',
      'Enhances operator safety',
    ],
    image: '/images/products/09_rubber_cushion_pads.png',
    icon: <Heart className="w-6 h-6" />,
    accent: '#FFA500',
  },
];

const extras = [
  { icon: <Shield className="w-5 h-5" />, title: 'Quality Assured', desc: 'ISO 9001:2015 certified manufacturing processes' },
  { icon: <Volume2 className="w-5 h-5" />, title: 'Noise Control', desc: 'Advanced acoustic dampening properties' },
  { icon: <Activity className="w-5 h-5" />, title: 'Vibration Isolation', desc: 'Superior shock absorption capabilities' },
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#FFD700]/4 rounded-full blur-[200px] pointer-events-none" />

      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent mb-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-0">

        {/* ── Header ── */}
        <div ref={headingRef} className="grid lg:grid-cols-2 gap-8 items-end mb-20 pt-16">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]/60 mb-5 font-medium">Performance Benefits</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[0.95] tracking-tight">
              Built for<br />
              <span className="text-[#FFD700]">performance.</span><br />
              Designed for<br />
              <span className="text-[#FFD700]">durability.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#FFD700]/30 pl-6">
              Our rubber components deliver measurable benefits that improve equipment performance
              and create safer, more comfortable working environments.
            </p>
          </div>
        </div>

        {/* ── Benefit Panels ── */}
        <div ref={panelsRef} className="space-y-6">
          {benefits.map((b, i) => (
            <div
              key={b.id}
              className={`benefit-panel group relative rounded-3xl overflow-hidden border border-white/6 hover:border-white/12 transition-all duration-500 flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Image side */}
              <div className="lg:w-[45%] flex-shrink-0 relative h-64 lg:h-auto min-h-[280px]">
                <img
                  src={b.image}
                  alt={b.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 ${i % 2 === 0 ? 'bg-gradient-to-r from-transparent to-[#0A0A0A]' : 'bg-gradient-to-l from-transparent to-[#0A0A0A]'} lg:block hidden`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent lg:hidden" />

                {/* Stat badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4">
                    <p className="font-black text-4xl font-display leading-none" style={{ color: b.accent }}>{b.stat}</p>
                    <p className="text-gray-400 text-xs mt-1 font-medium">{b.statLabel}</p>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center gap-6 bg-[#0f0f0f]">
                {/* Label + icon */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${b.accent}18`, color: b.accent }}>
                    {b.icon}
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: b.accent }}>{b.label}</p>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-base leading-relaxed">{b.description}</p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {b.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${b.accent}20` }}>
                        <Check className="w-3 h-3" style={{ color: b.accent }} />
                      </div>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="h-px w-full mt-2" style={{ background: `linear-gradient(to right, ${b.accent}40, transparent)` }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Extra Feature Strip ── */}
        <div ref={extrasRef} className="grid md:grid-cols-3 gap-4 mt-6">
          {extras.map((item, i) => (
            <div
              key={i}
              className="extra-card group flex items-start gap-4 bg-[#111] border border-white/6 rounded-2xl px-6 py-5 hover:border-[#FFD700]/25 hover:bg-[#141414] transition-all duration-300 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] flex-shrink-0 group-hover:bg-[#FFD700]/20 transition-colors mt-0.5">
                {item.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent mt-20" />
    </section>
  );
}
