import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Clock, Package, Users, TrendingUp, ShieldCheck, Zap, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 25,   suffix: '+', label: 'Years Experience',      icon: <Clock className="w-5 h-5" /> },
  { value: 1000, suffix: '+', label: 'Products Manufactured', icon: <Package className="w-5 h-5" /> },
  { value: 500,  suffix: '+', label: 'Clients Served',        icon: <Users className="w-5 h-5" /> },
  { value: 99,   suffix: '%', label: 'Quality Score',         icon: <TrendingUp className="w-5 h-5" /> },
];

const commitments = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Superior Quality',   desc: 'Every component meets the highest standards before leaving our facility.' },
  { icon: <Settings className="w-5 h-5" />,    title: 'Full Customization', desc: 'Manufactured to exact drawings, samples, dimensions, and material specs.' },
  { icon: <Zap className="w-5 h-5" />,         title: 'On-Time Delivery',   desc: 'Reliable timelines with no compromise on precision or performance.' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: value, duration: 2, ease: 'power2.out',
          onUpdate: function () { setCount(Math.floor(this.targets()[0].val)); },
        });
      },
      once: true,
    });
    return () => trigger.kill();
  }, [value]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold text-[#FFD700] font-display tabular-nums leading-none">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-item') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(leftRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#0A0A0A] overflow-hidden">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute -left-40 top-0 w-[600px] h-[600px] bg-[#FFD700]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#FFD700]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 space-y-20">

        {/* ── Row 1: Headline + Description ── */}
        <div ref={headingRef} className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#FFD700]/60 mb-5 font-medium">About Aardha Enterprises</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[0.92] tracking-tight">
              The small parts<br />
              with a <span className="text-[#FFD700]">big role.</span>
            </h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed text-justify border-l-2 border-[#FFD700]/30 pl-6 lg:pb-2">
            Discover what makes rubber such an incredible material and how you can put it to use
            in your operation. Our precision-engineered rubber components are designed to withstand
            extreme conditions while providing optimal performance.
          </p>
        </div>

        {/* ── Row 2: Stats Bar ── */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 border border-white/6 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`stat-item group flex flex-col gap-3 px-8 py-8 hover:bg-white/2 transition-colors duration-300
                ${i < stats.length - 1 ? 'border-r border-white/6' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] group-hover:bg-[#FFD700]/20 transition-colors">
                {s.icon}
              </div>
              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <p className="text-gray-500 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Row 3: Image + Commitments ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">

          {/* Left — Image */}
          <div ref={leftRef} className="relative">
            <div className="absolute -inset-4 bg-[#FFD700]/6 rounded-3xl blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-white/8 group h-full min-h-[420px]">
              <img
                src="/images/products/06_flange_gaskets.png"
                alt="Rubber Parts Collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* ISO tag */}
              <div className="absolute top-5 right-5 bg-[#FFD700] text-black rounded-xl px-4 py-2.5 shadow-2xl">
                <p className="text-xs font-black uppercase tracking-wider leading-none">ISO 9001:2015</p>
                <p className="text-xs font-medium opacity-60 mt-0.5">Certified</p>
              </div>

              {/* Bottom badge */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#FFD700] text-xs uppercase tracking-widest font-medium mb-1">Manufacturing Excellence</p>
                    <p className="text-white font-semibold text-lg leading-snug">State-of-the-art<br />production facilities</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Commitments */}
          <div ref={rightRef} className="flex flex-col justify-center gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#FFD700]/60 mb-2 font-medium">Our Commitment</p>
              <h3 className="text-3xl lg:text-4xl font-bold font-display text-white">
                Why Choose <span className="text-[#FFD700]">Aardha</span>
              </h3>
              <div className="w-12 h-0.5 bg-[#FFD700] mt-4" />
            </div>

            <div className="space-y-4">
              {commitments.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 bg-[#111] border border-white/6 rounded-2xl px-6 py-5 hover:border-[#FFD700]/25 hover:bg-[#141414] transition-all duration-300 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] flex-shrink-0 mt-0.5 group-hover:bg-[#FFD700]/20 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed text-justify">{item.desc}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#FFD700]/20 group-hover:bg-[#FFD700] transition-colors flex-shrink-0 mt-2" />
                </div>
              ))}
            </div>

            {/* Legacy note */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-[#FFD700]/8 to-transparent border border-[#FFD700]/15 rounded-2xl px-6 py-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/15 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-[#FFD700]" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed text-justify">
                Over <span className="text-[#FFD700] font-semibold">two decades</span> of precision manufacturing — trusted by 500+ clients across India.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
    </section>
  );
}
