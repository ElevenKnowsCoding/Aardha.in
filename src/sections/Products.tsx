import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Layers, Shield, Zap, Droplets, Factory } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Rubber Bush',
    category: 'Airport Projects',
    description: 'High-performance rubber bushes designed for airport runway applications. Provides excellent vibration isolation and durability under extreme load conditions.',
    features: ['Load Capacity: 50 tons', 'Temperature: -40°C to 120°C', 'UV Resistant', 'Abrasion Resistant'],
    image: '/images/products/rubber-bush.jpg',
    icon: <Layers className="w-5 h-5" />
  },
  {
    id: 2,
    name: 'Silicone Profile',
    category: 'Pharma Industries',
    description: 'Food-grade silicone profiles for pharmaceutical applications. FDA compliant with excellent chemical resistance and temperature stability.',
    features: ['FDA Approved', 'Temp Range: -80°C to 260°C', 'Shore A: 35-80', 'Non-toxic'],
    image: '/images/products/silicone-profile.jpg',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 3,
    name: 'Eye Seal',
    category: 'Metro Construction',
    description: 'Precision-engineered eye seals for launching shaft applications. Ensures watertight sealing in tunnel boring operations.',
    features: ['Watertight Seal', 'High Pressure Rating', 'Easy Installation', 'Long Service Life'],
    image: '/images/products/eye-seal.jpg',
    icon: <Droplets className="w-5 h-5" />
  },
  {
    id: 4,
    name: 'Segment Casting Pad',
    category: 'Metro Construction',
    description: 'Heavy-duty rubber cushion pads for tunnel segment casting. Provides uniform load distribution and prevents concrete damage.',
    features: ['Load Distribution', 'Concrete Protection', 'Reusable', 'High Compression Strength'],
    image: '/images/products/casting-pad.jpg',
    icon: <Factory className="w-5 h-5" />
  },
  {
    id: 5,
    name: 'Rebar Protection Cap',
    category: 'National Highway',
    description: 'Safety caps for reinforcing steel bars. Protects workers from sharp rebar ends and prevents corrosion.',
    features: ['Impact Resistant', 'Corrosion Protection', 'High Visibility', 'Easy Fit'],
    image: '/images/products/rebar-cap.jpg',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 6,
    name: 'Bridge Bearing',
    category: 'Highway Projects',
    description: 'Elastomeric bridge bearings designed to accommodate thermal expansion and rotation while supporting heavy structural loads.',
    features: ['Multi-directional Movement', 'Load Bearing: 100+ tons', 'Earthquake Resistant', 'Low Maintenance'],
    image: '/images/products/bridge-bearing.jpg',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 7,
    name: 'Water Stopper',
    category: 'Dam Projects',
    description: 'Hydrophilic waterstops for concrete joints. Expands on contact with water to create a permanent watertight seal.',
    features: ['Self-expanding', 'Chemical Resistant', 'Flexible Installation', 'Permanent Seal'],
    image: '/images/products/water-stopper.jpg',
    icon: <Droplets className="w-5 h-5" />
  },
  {
    id: 8,
    name: 'Dura Board',
    category: 'Highway Projects',
    description: 'High-performance expansion joint filler board. Compressible filler for concrete pavement and bridge expansion joints.',
    features: ['Compressible', 'Weather Resistant', 'Easy to Install', 'Long-lasting'],
    image: '/images/products/dura-board.jpg',
    icon: <Layers className="w-5 h-5" />
  }
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0, rotateX: 30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
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
      id="products"
      className="relative py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFA500]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Thousands of{' '}
            <span className="text-[#FFD700]">Industrial</span>
            <br />
            Rubber Parts
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Extruded and Moulded for Use in National Highway, Metro, Airport and Dam Projects.
            Precision-engineered components for critical infrastructure.
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-[#1A1A1A] rounded-2xl overflow-hidden cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {product.icon}
                  <span className="text-xs font-medium text-white">{product.category}</span>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform rotate-45 group-hover:rotate-0 scale-0 group-hover:scale-100">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-1.5">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1 h-1 bg-[#FFD700] rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* View More Link */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-[#FFD700] font-medium">View Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FFD700] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button className="magnetic-btn group inline-flex items-center gap-3 border-2 border-[#FFD700] text-[#FFD700] px-8 py-4 rounded-full font-semibold hover:bg-[#FFD700] hover:text-black transition-all duration-300">
            View All Products
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
