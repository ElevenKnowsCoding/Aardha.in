import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Layers, Shield, Zap, Droplets, Factory, X, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  category: string;
  about: string[];
  features: string[];
  image: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  // Highway & Infrastructure
  {
    id: 1,
    name: 'Rubber Bush',
    category: 'Highway & Infrastructure',
    about: [
      'We are a leading manufacturer of high-quality rubber bushes (rubber bunks) designed for superior performance in construction, automotive, industrial, railway, and marine applications. Our products are engineered to effectively absorb shock, reduce vibration, and enhance the durability of machinery and structures.',
      'Manufactured using premium-grade materials such as Natural Rubber, Nitrile, Neoprene, EPDM, and Silicone, our rubber bushes offer excellent strength, flexibility, and resistance to wear, oil, heat, and environmental conditions.',
      'We specialise in fully customised manufacturing, producing rubber bushes in any size, dimension, or specification as per client requirements. From cylindrical, flanged, tapered, and sleeve-type bushes to completely custom designs — any shape can be designed and manufactured based on drawings or samples provided.',
    ],
    features: ['Materials: NR, Nitrile, Neoprene, EPDM, Silicone', 'Cylindrical, flanged, tapered & sleeve types', 'Custom sizes, dimensions & tolerances', 'Oil, heat, wear & environment resistant'],
    image: '/images/products/01_rubber_bush.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 2,
    name: 'Rebar Caps',
    category: 'Highway & Infrastructure',
    about: [
      'We manufacture high-quality rebar caps designed to enhance safety on construction sites by securely covering exposed reinforcement bars. These caps help prevent injuries and improve overall site compliance.',
      'Manufactured using durable materials, our rebar caps are suitable for demanding construction environments. Each product is carefully designed to ensure a proper fit and long-lasting performance.',
      'All rebar caps can be custom manufactured in various sizes, colours, and material grades as per client requirements.',
    ],
    features: ['Durable construction-grade materials', 'Custom sizes & colours', 'Proper fit & long-lasting', 'Site safety compliant'],
    image: '/images/products/02_rebar_caps.png',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 3,
    name: 'Rebar Protection Strips',
    category: 'Highway & Infrastructure',
    about: [
      'Our rebar protection strips are designed to cover multiple rebars efficiently, providing enhanced safety and ease of installation on construction sites.',
      'They offer flexibility, durability, and excellent visibility, making them ideal for large-scale infrastructure projects.',
      'We offer full customization in terms of length, width, profile, material, and colour to suit specific project needs.',
    ],
    features: ['Covers multiple rebars at once', 'High visibility design', 'Custom length, width & profile', 'Flexible & durable'],
    image: '/images/products/03_rebar_protection_strips.png',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 4,
    name: 'Bridge Bearing Rubber Parts',
    category: 'Highway & Infrastructure',
    about: [
      'We manufacture bridge bearing rubber components that play a vital role in absorbing loads, accommodating structural movements, and reducing vibrations in bridges and elevated structures.',
      'These components are engineered to withstand heavy loads and varying environmental conditions, ensuring long-term structural stability.',
      'All products are custom designed and manufactured according to load specifications, dimensions, and project requirements.',
    ],
    features: ['Heavy load absorption', 'Multi-directional movement', 'Earthquake & vibration resistant', 'Custom load specifications'],
    image: '/images/products/04_bridge_bearing_rubber_parts.png',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 5,
    name: 'Couplers',
    category: 'Highway & Infrastructure',
    about: [
      'We manufacture precision-engineered couplers used for connecting reinforcement bars, ensuring strong and reliable structural continuity.',
      'Our couplers are designed for high strength, durability, and ease of installation in construction applications.',
      'Customization is available in terms of size, threading, coating, and compatibility with different reinforcement grades.',
    ],
    features: ['High tensile strength', 'Easy installation', 'Custom threading & coating', 'Compatible with various rebar grades'],
    image: '/images/products/05_couplers.png',
    icon: <Factory className="w-5 h-5" />,
  },
  // Airport & Heavy-Duty
  {
    id: 6,
    name: 'Flange Gaskets',
    category: 'Airport & Heavy-Duty',
    about: [
      'Our flange gaskets are manufactured to provide reliable sealing solutions in pipelines and industrial systems, preventing leakage and ensuring operational efficiency.',
      'We produce gaskets in a wide range of shapes and materials to suit different pressure and temperature conditions.',
      'All gaskets are available in custom sizes, thicknesses, and material grades as per client specifications.',
    ],
    features: ['Wide material range', 'Custom sizes & thickness', 'High pressure rated', 'Leak-proof sealing'],
    image: '/images/products/06_flange_gaskets.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 7,
    name: 'Water Stoppers',
    category: 'Airport & Heavy-Duty',
    about: [
      'We manufacture water stoppers designed to prevent water leakage in concrete joints, making them essential for structures such as basements, tunnels, dams, and airport runways.',
      'These products are engineered for durability, flexibility, and effective sealing under pressure.',
      'Customization is available in different profiles, dimensions, and materials depending on project requirements.',
    ],
    features: ['Flexible & durable', 'Pressure resistant sealing', 'Custom profiles & dimensions', 'Permanent watertight seal'],
    image: '/images/products/07_water_stoppers.png',
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    id: 8,
    name: 'Dura Boards',
    category: 'Airport & Heavy-Duty',
    about: [
      'We manufacture dura boards (rubber sheets and blocks) used for cushioning, impact absorption, and load distribution in heavy-duty applications.',
      'These boards are designed to withstand high pressure and harsh environmental conditions.',
      'We offer customization in thickness, density, size, and material composition.',
    ],
    features: ['High pressure resistance', 'Custom thickness & density', 'Impact absorption', 'Harsh environment rated'],
    image: '/images/products/08_dura_boards.png',
    icon: <Layers className="w-5 h-5" />,
  },
  // Metro, Rail & Tunnel
  {
    id: 9,
    name: 'Rubber Cushion Pads',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture rubber cushion pads designed to absorb shock and vibration in metro, railway, and heavy construction systems.',
      'These pads enhance structural performance and extend the lifespan of infrastructure components.',
      'All cushion pads are customized as per load capacity, thickness, and project specifications.',
    ],
    features: ['Shock & vibration absorption', 'Custom load capacity', 'Custom thickness', 'Extended service life'],
    image: '/images/products/09_rubber_cushion_pads.png',
    icon: <Factory className="w-5 h-5" />,
  },
  {
    id: 10,
    name: 'Segment Casting Rubber Parts',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture precision rubber components used in segment casting for tunnel construction. These parts ensure proper alignment, sealing, and durability during casting processes.',
      'Each component is produced according to exact design and engineering requirements provided by the client.',
    ],
    features: ['Precision alignment', 'Durable sealing', 'Per client drawings', 'Tunnel construction grade'],
    image: '/images/products/10_segment_casting_rubber_parts.png',
    icon: <Factory className="w-5 h-5" />,
  },
  {
    id: 11,
    name: 'TMT Protection Caps',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture TMT protection caps used to cover reinforcement bars, ensuring safety and protection on construction sites.',
      'These caps are designed for durability and easy installation.',
      'Available in various sizes and colours as per client needs.',
    ],
    features: ['Easy installation', 'Multiple sizes & colours', 'Impact resistant', 'Site safety compliant'],
    image: '/images/products/11_tmt_protection_caps.png',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 12,
    name: 'Foam Gaskets',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture high-quality foam gaskets that provide flexible and effective sealing solutions in applications requiring compression and adaptability.',
      'These gaskets are suitable for a wide range of industrial and construction uses.',
      'Customization is available in density, thickness, shape, and material.',
    ],
    features: ['Flexible sealing', 'Custom density & thickness', 'Custom shape & material', 'Compression adaptable'],
    image: '/images/products/12_foam_gaskets.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 13,
    name: 'Eye Seal (Launching Shaft)',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture eye seals used in launching shafts and tunneling operations to ensure proper sealing and prevent leakage.',
      'These seals are designed to perform under high pressure and challenging conditions.',
      'All products are customized based on project-specific dimensions and requirements.',
    ],
    features: ['High pressure rated', 'Watertight seal', 'Custom dimensions', 'Tunneling grade'],
    image: '/images/products/13_eye_seal_launching_shaft.png',
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    id: 14,
    name: 'Mild Steel Locator with Rubber',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture mild steel locators with rubber coating for precise positioning and support in construction assemblies.',
      'These components provide stability, accuracy, and protection during installation processes.',
      'Customization is available as per engineering drawings and specifications.',
    ],
    features: ['Precise positioning', 'Rubber coated steel', 'Per engineering drawings', 'Stability & protection'],
    image: '/images/products/14_mild_steel_locator_with_rubber.png',
    icon: <Factory className="w-5 h-5" />,
  },
  {
    id: 15,
    name: 'Rubber Sponge Tubes',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture rubber sponge tubes used for sealing, insulation, and vibration control applications.',
      'These tubes offer flexibility and durability across a wide range of environments.',
      'Available in customized diameters, densities, and material types.',
    ],
    features: ['Flexible & durable', 'Custom diameters & density', 'Sealing & insulation', 'Wide environment range'],
    image: '/images/products/15_rubber_sponge_tubes.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 16,
    name: 'Rubber Pads',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture rubber pads designed for load distribution, impact resistance, and vibration isolation in heavy-duty applications.',
      'These pads are widely used in infrastructure and industrial systems.',
      'Customization is available in size, thickness, hardness, and load-bearing capacity.',
    ],
    features: ['Load distribution', 'Custom size & thickness', 'Custom hardness (Shore A)', 'Heavy-duty rated'],
    image: '/images/products/16_rubber_pads.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 17,
    name: 'Triangular Rubber Gaskets',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture triangular rubber gaskets for specialized sealing applications where standard shapes are not suitable.',
      'These gaskets provide efficient sealing performance in complex assemblies.',
      'All products are custom-made as per required dimensions and profiles.',
    ],
    features: ['Specialized triangular profile', 'Custom dimensions', 'Complex assembly sealing', 'Precision manufactured'],
    image: '/images/products/17_triangular_rubber_gaskets.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 18,
    name: 'Rubber Bunks',
    category: 'Metro, Rail & Tunnel',
    about: [
      'We manufacture rubber bunks (support systems) used for structural support, cushioning, and stability in construction and industrial setups.',
      'These products are designed for heavy-duty performance and long-term durability.',
      'Customization is available based on size, load requirements, and application.',
    ],
    features: ['Heavy-duty structural support', 'Custom size & load rating', 'Long-term durability', 'Industrial grade'],
    image: '/images/products/18_rubber_bunks.png',
    icon: <Factory className="w-5 h-5" />,
  },
  // Pharmaceutical & Food-Grade
  {
    id: 19,
    name: 'Silicone & Viton Gaskets',
    category: 'Pharmaceutical & Food-Grade',
    about: [
      'We manufacture food-grade silicone and Viton gaskets suitable for pharmaceutical, food processing, and hygienic applications.',
      'These gaskets offer excellent resistance to temperature, chemicals, and environmental conditions. Temperature range: -80°C to +260°C.',
      'All products are available in custom shapes, sizes, colours, and hardness levels as per client requirements.',
    ],
    features: ['Temp range: -80°C to +260°C', 'FDA / food-grade compliant', 'Custom shapes & hardness', 'Chemical resistant'],
    image: '/images/products/19_silicone_viton_gaskets.png',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 20,
    name: 'Silicone Profiles',
    category: 'Pharmaceutical & Food-Grade',
    about: [
      'We manufacture custom silicone profiles used for sealing, insulation, and protection in sensitive environments.',
      'Profiles can be developed in various shapes including square, rectangular, circular, and custom designs.',
    ],
    features: ['Custom cross-sections', 'High temp resistance', 'Sealing & insulation', 'Pharma grade'],
    image: '/images/products/20_silicone_profiles.png',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 21,
    name: 'TC Gaskets',
    category: 'Pharmaceutical & Food-Grade',
    about: [
      'We manufacture Tri-Clamp (TC) gaskets used in hygienic pipeline systems for pharmaceutical and food industries.',
      'These gaskets ensure leak-proof connections and compliance with hygiene standards.',
      'Available in multiple sizes and materials as per client needs.',
    ],
    features: ['Tri-Clamp compatible', 'Hygienic standard compliant', 'Multiple sizes & materials', 'Leak-proof connections'],
    image: '/images/products/21_tc_gaskets.png',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 22,
    name: 'Silicone Sheets',
    category: 'Pharmaceutical & Food-Grade',
    about: [
      'We manufacture silicone sheets used for insulation, sealing, and high-temperature applications.',
      'These sheets are durable, flexible, and suitable for critical environments.',
      'Customization is available in thickness, size, and colour.',
    ],
    features: ['High temp rated', 'Custom thickness & size', 'Custom colour', 'Flexible & durable'],
    image: '/images/products/22_silicone_sheets.png',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: 23,
    name: 'Silicone Tubes',
    category: 'Pharmaceutical & Food-Grade',
    about: [
      'We manufacture silicone tubes used in fluid transfer systems in pharmaceutical and medical applications.',
      'These tubes are safe, flexible, and resistant to extreme temperatures.',
      'Available in custom inner/outer diameters, lengths, and material grades.',
    ],
    features: ['Extreme temp resistant', 'Custom ID/OD & length', 'Medical / pharma grade', 'Non-toxic & flexible'],
    image: '/images/products/23_silicone_tubes.png',
    icon: <Droplets className="w-5 h-5" />,
  },
  // Dam & Water Infrastructure
  {
    id: 24,
    name: 'Cement Hoses',
    category: 'Dam & Water Infrastructure',
    about: [
      'We manufacture cement hoses used for transporting cement and slurry in construction and dam projects.',
      'These hoses are designed for high durability and pressure resistance.',
      'Customization is available in diameter, length, and material composition.',
    ],
    features: ['High pressure rated', 'Abrasion resistant', 'Custom diameter & length', 'Slurry compatible'],
    image: '/images/products/24_cement_hoses.png',
    icon: <Factory className="w-5 h-5" />,
  },
  {
    id: 25,
    name: 'Rock Bolt Rubber Components',
    category: 'Dam & Water Infrastructure',
    about: [
      'We manufacture rubber components used with rock bolts for stabilization in tunnels, dams, and underground structures.',
      'These components enhance grip, sealing, and durability.',
      'All products are manufactured as per project specifications.',
    ],
    features: ['Enhanced grip', 'Sealing performance', 'Per project specifications', 'Underground rated'],
    image: '/images/products/25_rock_bolt_rubber_components.png',
    icon: <Factory className="w-5 h-5" />,
  },
  {
    id: 26,
    name: 'Eye Seals (Dam Applications)',
    category: 'Dam & Water Infrastructure',
    about: [
      'We manufacture heavy-duty eye seals used in dam and water infrastructure projects to prevent leakage and ensure sealing integrity.',
      'These seals are designed for long-term performance in high-pressure environments.',
      'Customization is available in size, material, and design.',
    ],
    features: ['High pressure rated', 'Long-term performance', 'Custom size & material', 'Dam & water grade'],
    image: '/images/products/26_eye_seals_dam_applications.png',
    icon: <Droplets className="w-5 h-5" />,
  },
];

export { products };
export type { Product };

function ProductPopup({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111111] rounded-3xl overflow-hidden w-full max-w-5xl border border-white/10 shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-[#FFD700] hover:text-black transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left — Image */}
        <div className="lg:w-2/5 flex-shrink-0 relative">
          <div className="aspect-square lg:aspect-auto lg:h-full min-h-[220px] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
          </div>
          {/* Category badge over image */}
          <div className="absolute bottom-4 left-4">
            <span className="text-xs bg-[#FFD700] text-black font-semibold px-3 py-1.5 rounded-full">
              {product.category}
            </span>
          </div>
        </div>

        {/* Right — Content */}
        <div className="flex-1 overflow-y-auto p-7 lg:p-10 flex flex-col gap-6">
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white font-display mb-1">
              {product.name}
            </h3>
            <div className="w-12 h-0.5 bg-[#FFD700] mt-3" />
          </div>

          {/* About paragraphs */}
          <div className="space-y-3">
            {product.about.map((para, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed text-justify">
                {para}
              </p>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-3">
              Key Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <ChevronRight className="w-4 h-4 text-[#FFD700] flex-shrink-0 mt-0.5" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Customization note */}
          <div className="mt-auto pt-5 border-t border-white/10">
            <p className="text-xs text-gray-500">
              All products are fully customizable based on client drawings, samples, dimensions, material specifications, hardness (Shore A), and environmental conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 100, opacity: 0, rotateX: 30 },
          {
            y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFA500]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div ref={headingRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            Thousands of{' '}
            <span className="text-[#FFD700]">Industrial</span>
            <br />
            Rubber Parts
          </h2>
          <p className="text-gray-400 text-lg text-justify max-w-2xl mx-auto">
            Extruded and Moulded for Use in National Highway, Metro, Airport and Dam Projects.
            Precision-engineered components for critical infrastructure.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-[#1A1A1A] rounded-2xl overflow-hidden cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {product.icon}
                  <span className="text-xs font-medium text-white">{product.category}</span>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform rotate-45 group-hover:rotate-0 scale-0 group-hover:scale-100">
                  <ArrowUpRight className="w-5 h-5 text-black" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.about[0]}
                </p>
                <div className="space-y-1.5">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1 h-1 bg-[#FFD700] rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm text-[#FFD700] font-medium">View Details</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FFD700] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/products')}
            className="magnetic-btn group inline-flex items-center gap-3 border-2 border-[#FFD700] text-[#FFD700] px-8 py-4 rounded-full font-semibold hover:bg-[#FFD700] hover:text-black transition-all duration-300"
          >
            View All Products
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {selectedProduct && (
        <ProductPopup product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
