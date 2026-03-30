import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Waves, Pill, Train, Plane, Construction } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Industry {
  id: number;
  name: string;
  description: string;
  products: string[];
  image: string;
  icon: React.ReactNode;
  color: string;
}

const industries: Industry[] = [
  {
    id: 1,
    name: 'Dam Projects',
    description: 'High-pressure sealing solutions for hydroelectric infrastructure. Our rubber components withstand extreme water pressure and environmental conditions.',
    products: ['Water Stoppers', 'Rock Bolts', 'Cement Hoses', 'Eye Seals'],
    image: '/images/industries/dam.jpg',
    icon: <Waves className="w-6 h-6" />,
    color: '#3B82F6'
  },
  {
    id: 2,
    name: 'Pharma Industries',
    description: 'FDA-compliant silicone and rubber components for pharmaceutical manufacturing. Food-grade materials with exceptional purity standards.',
    products: ['Silicone Profiles', 'TC Gaskets', 'Silicone Tubes', 'Silicone Sheets'],
    image: '/images/industries/pharma.jpg',
    icon: <Pill className="w-6 h-6" />,
    color: '#10B981'
  },
  {
    id: 3,
    name: 'National Highway',
    description: 'Expansion joint systems and bridge bearings designed for heavy traffic loads and extreme weather conditions.',
    products: ['Bridge Bearings', 'Rebar Caps', 'Dura Boards', 'Expansion Joints'],
    image: '/images/industries/highway.jpg',
    icon: <Construction className="w-6 h-6" />,
    color: '#F59E0B'
  },
  {
    id: 4,
    name: 'Metro Construction',
    description: 'Tunnel segment gaskets and rail pads for underground railway systems. Engineered for longevity and safety.',
    products: ['Segment Casting Pads', 'Rail Pads', 'Eye Seals', 'Rubber Sponge Tubes'],
    image: '/images/industries/metro.jpg',
    icon: <Train className="w-6 h-6" />,
    color: '#EF4444'
  },
  {
    id: 5,
    name: 'Airport Projects',
    description: 'Runway sealing and FOD prevention systems. High-performance rubber parts for aviation infrastructure.',
    products: ['Rubber Bushes', 'Flange Gaskets', 'Dura Boards', 'Water Stoppers'],
    image: '/images/industries/airport.jpg',
    icon: <Plane className="w-6 h-6" />,
    color: '#8B5CF6'
  }
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Industry cards animation
      const cards = sectionRef.current?.querySelectorAll('.industry-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="relative py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FFD700]/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Used in every <span className="text-[#FFD700]">country</span>,
            <br />
            in every <span className="text-[#FFD700]">industry</span>.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our precision rubber parts serve critical infrastructure projects across diverse sectors,
            delivering reliability where it matters most.
          </p>
        </div>

        {/* Industries Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              className={`industry-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out
                ${activeIndex === index ? 'lg:flex-[3]' : 'lg:flex-1'}
                ${activeIndex !== null && activeIndex !== index ? 'lg:flex-[0.5]' : ''}
              `}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className={`w-full h-full object-cover transition-transform duration-700
                    ${activeIndex === index ? 'scale-100' : 'scale-110'}
                  `}
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500
                  ${activeIndex === index 
                    ? 'bg-gradient-to-t from-black via-black/70 to-black/30' 
                    : 'bg-gradient-to-t from-black via-black/80 to-black/60'}
                `} />
              </div>

              {/* Content */}
              <div className="relative h-full min-h-[300px] lg:min-h-0 p-6 flex flex-col justify-end">
                {/* Icon */}
                <div 
                  className={`mb-4 transition-all duration-500
                    ${activeIndex === index ? 'opacity-100 scale-100' : 'opacity-70 scale-90'}
                  `}
                  style={{ color: industry.color }}
                >
                  {industry.icon}
                </div>

                {/* Title */}
                <h3 
                  className={`text-2xl font-bold text-white mb-2 transition-all duration-500
                    ${activeIndex === index ? 'lg:text-3xl' : 'lg:text-xl lg:writing-mode-vertical'}
                  `}
                  style={{ writingMode: activeIndex !== index && window.innerWidth >= 1024 ? 'vertical-rl' : 'horizontal-tb' }}
                >
                  {industry.name}
                </h3>

                {/* Expanded Content */}
                <div 
                  className={`overflow-hidden transition-all duration-500
                    ${activeIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Products List */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {industry.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/10 text-white px-3 py-1 rounded-full"
                      >
                        {product}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button 
                    className="flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: industry.color }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Collapsed Indicator */}
                <div 
                  className={`absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                    ${activeIndex === index ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
                  `}
                  style={{ backgroundColor: `${industry.color}30` }}
                >
                  <ArrowRight className="w-4 h-4" style={{ color: industry.color }} />
                </div>
              </div>

              {/* Bottom Border */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500
                  ${activeIndex === index ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ backgroundColor: industry.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
