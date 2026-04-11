import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ArrowUpRight, Waves, Pill, Train, Plane, HardHat, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Industry {
  id: number;
  name: string;
  tagline: string;
  description: string[];
  products: string[];
  image: string;
  icon: React.ReactNode;
  accent: string;
  stat: { value: string; label: string };
}

const industries: Industry[] = [
  {
    id: 1,
    name: 'Dam & Water Infrastructure',
    tagline: 'Sealing the force of water',
    description: [
      'Our rubber components play a critical role in dam construction and water infrastructure projects, providing reliable sealing and structural support under extreme hydrostatic pressure.',
      'From water stoppers that prevent leakage in concrete joints to heavy-duty eye seals for dam applications, every product is engineered for long-term performance in high-pressure, high-moisture environments.',
      'We supply cement hoses, rock bolt rubber components, and custom eye seals that meet the demanding requirements of dam engineers and contractors across India.',
    ],
    products: ['Water Stoppers', 'Eye Seals (Dam)', 'Cement Hoses', 'Rock Bolt Rubber Components'],
    image: '/images/industries/dam.jpg',
    icon: <Waves className="w-6 h-6" />,
    accent: '#3B82F6',
    stat: { value: '100+', label: 'Dam Projects Supplied' },
  },
  {
    id: 2,
    name: 'Pharmaceutical & Food-Grade',
    tagline: 'Purity in every component',
    description: [
      'In pharmaceutical and food processing environments, material purity and compliance are non-negotiable. Our food-grade silicone and Viton components are manufactured to meet FDA, RoHS, and REACH standards.',
      'We produce TC gaskets for hygienic pipeline systems, silicone tubes for fluid transfer, silicone profiles for sealing and insulation, and silicone sheets for high-temperature applications.',
      'With a temperature range of -80°C to +260°C, our pharma-grade products deliver consistent performance in the most sensitive production environments.',
    ],
    products: ['Silicone & Viton Gaskets', 'TC Gaskets', 'Silicone Tubes', 'Silicone Profiles', 'Silicone Sheets'],
    image: '/images/industries/pharma.jpg',
    icon: <Pill className="w-6 h-6" />,
    accent: '#10B981',
    stat: { value: '-80°C to +260°C', label: 'Temperature Range' },
  },
  {
    id: 3,
    name: 'Highway & Infrastructure',
    tagline: 'Built for the long road ahead',
    description: [
      'National highways and large-scale infrastructure projects demand components that can withstand heavy traffic loads, thermal expansion, and harsh environmental conditions over decades.',
      'Our bridge bearing rubber parts absorb loads and accommodate structural movements in bridges and elevated structures. Rebar caps and protection strips ensure worker safety on construction sites.',
      'Precision-engineered couplers provide strong structural continuity for reinforcement bars, while all products are fully customizable to project-specific load and dimensional requirements.',
    ],
    products: ['Bridge Bearing Rubber Parts', 'Rebar Caps', 'Rebar Protection Strips', 'Couplers', 'Rubber Bush'],
    image: '/images/industries/highway.jpg',
    icon: <HardHat className="w-6 h-6" />,
    accent: '#F59E0B',
    stat: { value: '200+', label: 'Highway Projects' },
  },
  {
    id: 4,
    name: 'Metro, Rail & Tunnel',
    tagline: 'Precision underground',
    description: [
      'Metro and tunnel construction requires rubber components that perform flawlessly under continuous vibration, high pressure, and confined underground conditions.',
      'We manufacture segment casting rubber parts for tunnel boring operations, rubber cushion pads for shock absorption in railway systems, and eye seals for launching shafts that prevent water ingress.',
      'Our product range also includes foam gaskets, triangular rubber gaskets, mild steel locators with rubber, rubber sponge tubes, rubber pads, and rubber bunks — all manufactured to exact engineering specifications.',
    ],
    products: ['Segment Casting Parts', 'Rubber Cushion Pads', 'Eye Seal (Launching Shaft)', 'Foam Gaskets', 'Rubber Pads', 'TMT Protection Caps'],
    image: '/images/industries/metro.jpg',
    icon: <Train className="w-6 h-6" />,
    accent: '#EF4444',
    stat: { value: '50+', label: 'Metro Projects' },
  },
  {
    id: 5,
    name: 'Airport & Heavy-Duty',
    tagline: 'Where precision meets performance',
    description: [
      'Airport infrastructure and heavy-duty industrial applications demand rubber components that deliver consistent performance under extreme mechanical stress, temperature variation, and continuous load cycles.',
      'Our rubber bushes provide vibration isolation and noise reduction in airport systems and industrial machinery. Flange gaskets ensure leak-proof sealing in high-pressure pipeline systems.',
      'Water stoppers and dura boards complete our airport-grade product range, all manufactured with premium materials and available in fully customized dimensions and specifications.',
    ],
    products: ['Rubber Bush', 'Flange Gaskets', 'Water Stoppers', 'Dura Boards'],
    image: '/images/industries/airport.jpg',
    icon: <Plane className="w-6 h-6" />,
    accent: '#8B5CF6',
    stat: { value: '30+', label: 'Airport Projects' },
  },
];

function IndustryPopup({ industry, onClose }: { industry: Industry; onClose: () => void }) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(popupRef.current,
      { opacity: 0, scale: 0.96, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(popupRef.current, {
      opacity: 0, scale: 0.96, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={popupRef}
        className="relative bg-[#0f0f0f] rounded-3xl overflow-hidden w-full max-w-5xl border border-white/10 shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white hover:text-black transition-all duration-200"
          style={{ ['--hover-bg' as string]: industry.accent }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = industry.accent)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left — Image */}
        <div className="lg:w-[42%] flex-shrink-0 relative">
          <div className="h-56 lg:h-full min-h-[220px] overflow-hidden">
            <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0f0f]" />
          </div>

          {/* Stat chip */}
          <div className="absolute bottom-5 left-5">
            <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
              <p className="font-bold text-xl" style={{ color: industry.accent }}>{industry.stat.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{industry.stat.label}</p>
            </div>
          </div>

          {/* Icon badge */}
          <div className="absolute top-5 left-5 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${industry.accent}25` }}>
            <span style={{ color: industry.accent }}>{industry.icon}</span>
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 overflow-y-auto p-7 lg:p-10 flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: industry.accent }}>
              {industry.tagline}
            </p>
            <h3 className="text-2xl lg:text-3xl font-bold text-white font-display">{industry.name}</h3>
            <div className="w-10 h-0.5 mt-3" style={{ backgroundColor: industry.accent }} />
          </div>

          <div className="space-y-3">
            {industry.description.map((para, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed text-justify">{para}</p>
            ))}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: industry.accent }}>
              Products We Supply
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {industry.products.map((p, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: industry.accent }} />
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-5 border-t border-white/8">
            <p className="text-xs text-gray-600">
              All products are fully customizable based on client drawings, dimensions, material specifications, and project requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Industry | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(gridRef.current?.querySelectorAll('.industry-card') ?? [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="relative py-32 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFD700]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFD700]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div ref={headingRef} className="grid lg:grid-cols-2 gap-8 items-end mb-20">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]/60 mb-5 font-medium">Industries We Serve</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[0.95] tracking-tight">
              Used in every<br />
              <span className="text-[#FFD700]">country</span>, in every<br />
              <span className="text-[#FFD700]">industry.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="text-gray-400 text-lg leading-relaxed text-justify border-l-2 border-[#FFD700]/30 pl-6">
              Our precision rubber parts serve critical infrastructure projects across diverse sectors,
              delivering reliability where it matters most.
            </p>
          </div>
        </div>

        {/* Featured card (first) + grid (rest) */}
        <div ref={gridRef} className="space-y-4">

          {/* Top row — featured large card */}
          <div
            className="industry-card group relative rounded-3xl overflow-hidden cursor-pointer h-[420px] border border-white/6 hover:border-white/15 transition-all duration-500"
            onClick={() => setSelected(industries[0])}
          >
            <img src={industries[0].image} alt={industries[0].name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

            <div className="relative h-full flex flex-col justify-between p-8 lg:p-12">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${industries[0].accent}25` }}>
                  <span style={{ color: industries[0].accent }}>{industries[0].icon}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#FFD700]">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" />
                </div>
              </div>

              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-widest font-medium mb-3" style={{ color: industries[0].accent }}>
                  {industries[0].tagline}
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white font-display mb-3">{industries[0].name}</h3>
                <p className="text-gray-400 text-base leading-relaxed text-justify line-clamp-2">{industries[0].description[0]}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {industries[0].products.map((p, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full border text-gray-300" style={{ borderColor: `${industries[0].accent}40`, backgroundColor: `${industries[0].accent}10` }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: industries[0].accent }} />
          </div>

          {/* Bottom row — 4 equal cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.slice(1).map((industry) => (
              <div
                key={industry.id}
                className="industry-card group relative rounded-2xl overflow-hidden cursor-pointer h-[320px] border border-white/6 hover:border-white/15 transition-all duration-500"
                onClick={() => setSelected(industry)}
              >
                <img src={industry.image} alt={industry.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />

                <div className="relative h-full flex flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${industry.accent}25` }}>
                      <span style={{ color: industry.accent }}>{industry.icon}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: industry.accent }}>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest font-medium mb-2" style={{ color: industry.accent }}>
                      {industry.tagline}
                    </p>
                    <h3 className="text-lg font-bold text-white font-display mb-2 leading-snug">{industry.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {industry.description[0]}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium" style={{ color: industry.accent }}>
                      <span>View Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: industry.accent }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <IndustryPopup industry={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
