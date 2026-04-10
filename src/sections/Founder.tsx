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
                Mr. R. K. <span className="text-[#FFD700]">Bhalla</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                Mr. R. K. Bhalla is the visionary Founder of Aardha Enterprises, a company he established over two decades ago with a steadfast commitment to integrity, precision, and manufacturing excellence. With more than 20 years of industry experience, he has transformed the organization from a small venture into a respected leader in the industrial sector. Under his hands-on leadership, the company has developed a reputation for delivering high-quality, dependable solutions that meet the evolving demands of modern commerce.
              </p>
              <p>
                Today, Aardha Enterprises is recognized for its specialized expertise in producing a diverse range of industrial rubber products, including oil seals, silicone tubes, hydraulic hoses, and customized gaskets. Mr. Bhalla's leadership philosophy is rooted in the belief that a company's true strength lies in its ability to balance innovation with long-term client partnerships. Driven by his entrepreneurial vision and an unwavering work ethic, the company continues to grow steadily, remaining a trusted name for industries seeking durable products and exceptional service.
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
