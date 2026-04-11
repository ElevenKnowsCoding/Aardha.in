import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowUpRight, Waves, Pill, Train, Plane, HardHat, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C8A951';

const industries = [
  {
    icon: <Train className="w-6 h-6" />,
    name: 'Metro, Rail & Tunnel',
    tagline: 'Precision underground',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=80',
    desc: 'Segment casting parts, rubber cushion pads, eye seals, foam gaskets, and rubber pads — all manufactured to exact engineering specifications for metro and tunnel construction.',
    tags: ['Segment Casting Parts', 'Rubber Cushion Pads', 'Eye Seals', 'Foam Gaskets', 'TMT Protection Caps'],
  },
  {
    icon: <HardHat className="w-6 h-6" />,
    name: 'Highway & Bridge',
    tagline: 'Built for the long road ahead',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    desc: 'Bridge bearing rubber parts, rebar caps, protection strips, and couplers for national highway and bridge construction projects.',
    tags: ['Bridge Bearings', 'Rebar Caps', 'Couplers', 'Rubber Bush'],
  },
  {
    icon: <Waves className="w-6 h-6" />,
    name: 'Dam & Water Infrastructure',
    tagline: 'Sealing the force of water',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    desc: 'Water stoppers, eye seals, cement hoses, and rock bolt rubber components for dam and water management projects.',
    tags: ['Water Stoppers', 'Eye Seals', 'Cement Hoses', 'Rock Bolt Components'],
  },
  {
    icon: <Plane className="w-6 h-6" />,
    name: 'Airport & Heavy-Duty',
    tagline: 'Where precision meets performance',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    desc: 'Rubber bushes, flange gaskets, water stoppers, and dura boards for airport infrastructure and heavy industrial applications.',
    tags: ['Rubber Bush', 'Flange Gaskets', 'Dura Boards', 'Water Stoppers'],
  },
  {
    icon: <Pill className="w-6 h-6" />,
    name: 'Pharmaceutical & Food-Grade',
    tagline: 'Purity in every component',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80',
    desc: 'FDA-grade silicone profiles, TC gaskets, silicone tubes and sheets for pharmaceutical and food processing environments. Temp range: −80°C to +260°C.',
    tags: ['TC Gaskets', 'Silicone Tubes', 'Silicone Profiles', 'Silicone Sheets'],
  },
];

function Popup({ ind, onClose }: { ind: typeof industries[0]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, scale: 0.96, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power3.out' });
  }, []);
  const close = () => gsap.to(ref.current, { opacity: 0, scale: 0.96, y: 20, duration: 0.2, ease: 'power2.in', onComplete: onClose });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={close}>
      <div ref={ref} className="relative bg-[#0f0f0f] rounded-3xl overflow-hidden w-full max-w-4xl border border-white/10 shadow-2xl flex flex-col lg:flex-row max-h-[88vh]"
        onClick={e => e.stopPropagation()}>
        <button onClick={close}
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-black/60 rounded-full flex items-center justify-center text-white transition-all"
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = GOLD)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)')}>
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="lg:w-[42%] flex-shrink-0 relative h-52 lg:h-auto">
          <img src={ind.image} alt={ind.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0f0f]" />
          <div className="absolute top-5 left-5 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${GOLD}25`, color: GOLD }}>
            {ind.icon}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-7 lg:p-10 flex flex-col gap-5">
          <div>
            <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: GOLD }}>{ind.tagline}</p>
            <h3 className="text-2xl lg:text-3xl font-bold text-white font-display">{ind.name}</h3>
            <div className="w-10 h-0.5 mt-3" style={{ backgroundColor: GOLD }} />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{ind.desc}</p>
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: GOLD }}>Products We Supply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ind.tags.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: GOLD }} />{t}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-auto pt-4 border-t border-white/6">
            All products fully customisable to client drawings, dimensions, and material specifications.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ArshIndustries() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<typeof industries[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(gridRef.current?.querySelectorAll('.ind-card') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="relative py-28 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.07]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8A951]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C8A951]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headRef} className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] mb-5 font-medium" style={{ color: `${GOLD}80` }}>
              Industries We Serve
            </p>
            <h2 className="text-5xl md:text-6xl font-bold font-display leading-[0.95] tracking-tight">
              Trusted across<br />
              <span style={{ color: GOLD }}>every sector.</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed border-l-2 pl-6 lg:pb-2" style={{ borderColor: `${GOLD}35` }}>
            Our precision rubber parts serve critical UK infrastructure projects across five key sectors,
            delivering reliability where it matters most.
          </p>
        </div>

        <div ref={gridRef} className="space-y-4">

          {/* Featured large card */}
          <div className="ind-card group relative rounded-3xl overflow-hidden cursor-pointer h-[400px] border border-white/6 hover:border-white/15 transition-all duration-500"
            onClick={() => setSelected(industries[0])}>
            <img src={industries[0].image} alt={industries[0].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/10" />

            <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${GOLD}25`, color: GOLD }}>
                  {industries[0].icon}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#C8A951]">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: GOLD }}>{industries[0].tagline}</p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white font-display mb-3">{industries[0].name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{industries[0].desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {industries[0].tags.map((t, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full border text-gray-300"
                      style={{ borderColor: `${GOLD}40`, backgroundColor: `${GOLD}12` }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: GOLD }} />
          </div>

          {/* 4-card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.slice(1).map((ind, i) => (
              <div key={i}
                className="ind-card group relative rounded-2xl overflow-hidden cursor-pointer h-[300px] border border-white/6 hover:border-white/15 transition-all duration-500"
                onClick={() => setSelected(ind)}>
                <img src={ind.image} alt={ind.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/5" />

                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${GOLD}25`, color: GOLD }}>
                      {ind.icon}
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: GOLD }}>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-medium mb-1.5" style={{ color: GOLD }}>{ind.tagline}</p>
                    <h3 className="text-base font-bold text-white font-display leading-snug mb-3">{ind.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-medium" style={{ color: GOLD }}>
                      <span>View Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: GOLD }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <Popup ind={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
