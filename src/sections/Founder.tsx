import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo(imageRef.current,
        { x: 80, opacity: 0, filter: 'grayscale(100%)' },
        {
          x: 0, opacity: 1, filter: 'grayscale(0%)', duration: 1.5, ease: 'expo.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <pattern id="founder-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FFD700" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#founder-grid)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div ref={contentRef} className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Meet the Founder</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
                Mr. R. K.
                <br />
                <span className="text-[#FFD700]">Bhalla</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                Mr. R. K. Bhalla is the visionary Founder of Aardha Enterprises, a company recognised for its commitment to quality manufacturing and dependable industrial solutions. With over two decades of industry experience, he has successfully built and led the organisation with a strong focus on integrity, precision, and customer satisfaction.
              </p>
              <p>
                A firm believer in hard work and perseverance, Mr. Bhalla established Aardha Enterprises more than 20 years ago with the goal of creating a manufacturing enterprise that delivers reliable and high-quality products to meet the evolving needs of modern industries. Through dedication, strategic thinking, and hands-on leadership, he transformed the company from a small venture into a trusted and respected name in the manufacturing sector.
              </p>
              <p>
                Under his leadership, Aardha Enterprises has developed expertise in manufacturing a wide range of industrial rubber products, including rubber rollers, oil seals, silicone tubes, rubber gaskets, hydraulic hoses, rubber beadings, and O-rings, and many other customised rubber products serving clients across multiple industries with consistent quality and performance.
              </p>
              <p>
                Mr. Bhalla's leadership philosophy is rooted in innovation, quality excellence, and long term partnerships. He believes that a company's true strength lies in maintaining high manufacturing standards while building trust with clients.
              </p>
              <p>
                Today, Aardha Enterprises continues to grow steadily under his guidance, driven by a commitment to delivering durable products, reliable solutions, and exceptional service. His entrepreneurial vision, dedication, and unwavering work ethic remain the foundation of the company's continued success.
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute -inset-4 bg-[#FFD700]/20 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-4">
                <img
                  src="/images/founder/founder.jpeg"
                  alt="Mr. R. K. Bhalla - Founder, Aardha Enterprises"
                  className="w-full rounded-2xl object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Founder & Visionary</p>
                  <p className="text-white font-semibold">Aardha Enterprises</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
