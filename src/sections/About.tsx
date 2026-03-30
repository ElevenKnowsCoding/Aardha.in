import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle, TrendingUp, Users, Clock, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { value: 25, suffix: '+', label: 'Years Experience', icon: <Clock className="w-6 h-6" /> },
  { value: 1000, suffix: '+', label: 'Products', icon: <Package className="w-6 h-6" /> },
  { value: 500, suffix: '+', label: 'Clients', icon: <Users className="w-6 h-6" /> },
  { value: 99, suffix: '%', label: 'Quality Score', icon: <TrendingUp className="w-6 h-6" /> }
];

const certifications = [
  'ISO 9001:2015 Certified',
  'FDA Approved Materials',
  'RoHS Compliant',
  'REACH Compliant'
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            setCount(Math.floor(this.targets()[0].val));
          }
        });
      },
      once: true
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={counterRef} className="text-4xl md:text-5xl font-bold text-[#FFD700]">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation with blueprint effect
      gsap.fromTo(imageRef.current,
        { x: 80, opacity: 0, filter: 'grayscale(100%)' },
        {
          x: 0,
          opacity: 1,
          filter: 'grayscale(0%)',
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(statItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: statsRef.current,
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
      id="about"
      className="relative py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Animated Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FFD700" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
                The small parts with
                <br />
                <span className="text-[#FFD700]">a big role.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Discover what makes rubber such an incredible material and how you can put it to use 
                in your operation. Our precision-engineered rubber components are designed to withstand 
                extreme conditions while providing optimal performance.
              </p>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Certifications & Standards
              </h3>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-full"
                  >
                    <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                    <span className="text-sm text-white">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ISO Badge */}
            <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-[#1A1A1A] to-transparent rounded-2xl border border-white/5">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-black" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">ISO 9001:2015 Certified</p>
                <p className="text-gray-500 text-sm">Quality Management System</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image & Stats */}
          <div ref={imageRef} className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute -inset-4 bg-[#FFD700]/20 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-4">
                <img
                  src="/images/products/flange-gasket.jpg"
                  alt="Rubber Parts Collection"
                  className="w-full rounded-2xl"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Manufacturing Excellence</p>
                  <p className="text-white font-semibold">State-of-the-art production facilities</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="stat-item glass rounded-xl p-4 hover:bg-white/5 transition-colors cursor-default"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-[#FFD700]">{stat.icon}</div>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
