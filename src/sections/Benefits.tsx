import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Shield, Volume2, Activity, Settings, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  stats: { value: string; label: string };
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: 'Equipment Longevity',
    description: 'Constant movement and wear will affect any units associated, potentially causing failure at the source or further down the line. Our Vibration Control Products are specifically designed for applications that include National Highway, Metro, Airport and Dam projects.',
    features: [
      'Reduces mechanical stress',
      'Preserves equipment life',
      'Isolates vibration forces',
      'Minimizes maintenance costs'
    ],
    image: '/images/products/bridge-bearing.jpg',
    icon: <Settings className="w-8 h-8" />,
    stats: { value: '3x', label: 'Longer Lifespan' }
  },
  {
    id: 2,
    title: 'Operator Comfort',
    description: 'Whether on the shop floor or inside heavy equipment, the smooth operation of machinery is important for worker comfort and health and safety. With the growing trend to use heavy equipment cabs as high-tech work spaces.',
    features: [
      'Minimizes sound levels',
      'Reduces vibration transmission',
      'Improves workspace ergonomics',
      'Enhances operator safety'
    ],
    image: '/images/products/silicone-tube.jpg',
    icon: <Heart className="w-8 h-8" />,
    stats: { value: '60%', label: 'Noise Reduction' }
  }
];

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
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

      // Cards animation with magnetic effect
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { y: 100 + (index * 50), opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(card, {
      x: x * 0.05,
      y: y * 0.05,
      rotateX: -y * 0.02,
      rotateY: x * 0.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#FFD700]/5 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Built for <span className="text-[#FFD700]">performance</span>.
            <br />
            Designed for <span className="text-[#FFD700]">durability</span>.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our rubber components deliver measurable benefits that improve equipment performance
            and create safer, more comfortable working environments.
          </p>
        </div>

        {/* Benefits Cards */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="benefit-card relative group"
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              <div className="relative bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FFD700]/30 transition-colors duration-500">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/50 to-transparent" />
                  
                  {/* Stats Badge */}
                  <div className="absolute top-6 right-6 glass rounded-xl px-4 py-2">
                    <p className="text-2xl font-bold text-[#FFD700]">{benefit.stats.value}</p>
                    <p className="text-xs text-gray-400">{benefit.stats.label}</p>
                  </div>

                  {/* Icon */}
                  <div className="absolute bottom-6 left-6 w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center text-black">
                    {benefit.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFD700] transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-300">
                        <div className="w-5 h-5 bg-[#FFD700]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#FFD700]" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/5 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits Row */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: <Shield className="w-6 h-6" />, title: 'Quality Assured', desc: 'ISO 9001:2015 certified manufacturing processes' },
            { icon: <Volume2 className="w-6 h-6" />, title: 'Noise Control', desc: 'Advanced acoustic dampening properties' },
            { icon: <Activity className="w-6 h-6" />, title: 'Vibration Isolation', desc: 'Superior shock absorption capabilities' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-default group"
            >
              <div className="w-12 h-12 bg-[#FFD700]/20 rounded-xl flex items-center justify-center text-[#FFD700] mb-4 group-hover:bg-[#FFD700] group-hover:text-black transition-colors">
                {item.icon}
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
