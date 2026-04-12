import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Settings, Zap, Clock, Package, Users, TrendingUp, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C8A951';

const stats = [
  { value: 20,  suffix: '+', label: 'Years Experience', icon: <Clock className="w-5 h-5" /> },
  { value: 26,  suffix: '+', label: 'Product Types',    icon: <Package className="w-5 h-5" /> },
  { value: 500, suffix: '+', label: 'Clients Served',   icon: <Users className="w-5 h-5" /> },
  { value: 99,  suffix: '%', label: 'Quality Score',    icon: <TrendingUp className="w-5 h-5" /> },
];

const cards = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Superior Quality',   desc: 'Every component meets the highest standards before leaving the facility. ISO 9001:2015 certified.' },
  { icon: <Settings className="w-5 h-5" />,    title: 'Full Customisation', desc: 'Manufactured to exact drawings, samples, dimensions, and material specifications.' },
  { icon: <Zap className="w-5 h-5" />,         title: 'On-Time Delivery',   desc: 'Reliable timelines with no compromise on precision or performance.' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const t = ScrollTrigger.create({
      trigger: ref.current, start: 'top 90%', once: true,
      onEnter: () => gsap.to({ v: 0 }, {
        v: value, duration: 2, ease: 'power2.out',
        onUpdate: function () { setCount(Math.floor(this.targets()[0].v)); },
      }),
    });
    return () => t.kill();
  }, [value]);
  return <span ref={ref} className="text-4xl lg:text-5xl font-bold font-display tabular-nums" style={{ color: GOLD }}>{count}{suffix}</span>;
}

export default function ArshAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-item') ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(imgRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(cardsRef.current?.querySelectorAll('.commit-card') ?? [],
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'expo.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#0A0A0A] overflow-hidden">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A951]/25 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
      <div className="absolute -left-40 top-0 w-[500px] h-[500px] bg-[#C8A951]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-[#C8A951]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 space-y-20">

        {/* Headline */}
        <div ref={headRef} className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] mb-5 font-medium" style={{ color: `${GOLD}80` }}>
              About Arsh Solution Ltd
            </p>
            <h2 className="text-5xl md:text-6xl font-bold font-display leading-[0.92] tracking-tight">
              Bridging world-class<br />
              <span style={{ color: GOLD }}>Indian manufacturing</span><br />
              with UK industry.
            </h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed border-l-2 pl-6" style={{ borderColor: `${GOLD}35` }}>
            Arsh Solution Ltd is the exclusive UK partner for Aardha Enterprises — bringing over two
            decades of precision rubber manufacturing expertise directly to British clients, backed by
            dedicated London-based support.
          </p>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 border border-white/6 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <div key={i}
              className={`stat-item group flex flex-col gap-3 px-8 py-8 hover:bg-white/[0.02] transition-colors ${i < stats.length - 1 ? 'border-r border-white/6' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-[#C8A951]/20 transition-colors"
                style={{ backgroundColor: `${GOLD}15`, color: GOLD }}>
                {s.icon}
              </div>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Image + commitment cards */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">

          {/* Image panel */}
          <div ref={imgRef} className="relative">
            <div className="absolute -inset-3 rounded-3xl blur-3xl" style={{ backgroundColor: `${GOLD}08` }} />
            <div className="relative rounded-3xl overflow-hidden border border-white/8 group h-full min-h-[420px]">
              <img src="/images/aardha_factory.jpeg" alt="Aardha Enterprises Manufacturing"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* ISO badge */}
              <div className="absolute top-5 right-5 rounded-xl px-4 py-2.5 shadow-xl" style={{ backgroundColor: GOLD }}>
                <p className="text-xs font-black uppercase tracking-wider leading-none text-black">ISO 9001:2015</p>
                <p className="text-[10px] font-medium opacity-70 mt-0.5 text-black">Certified</p>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-medium mb-1" style={{ color: GOLD }}>Manufacturing Partner</p>
                    <p className="text-white font-semibold text-lg leading-snug">Aardha Enterprises<br /><span className="text-gray-400 text-sm font-normal">Delhi, India</span></p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: GOLD }}>
                    <Award className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commitment cards */}
          <div ref={cardsRef} className="flex flex-col justify-center gap-4">
            <div className="mb-2">
              <p className="text-xs uppercase tracking-[0.3em] mb-2 font-medium" style={{ color: `${GOLD}80` }}>Our Commitment</p>
              <h3 className="text-3xl font-bold font-display text-white">
                Why Choose <span style={{ color: GOLD }}>Arsh Solution</span>
              </h3>
              <div className="w-12 h-0.5 mt-4" style={{ backgroundColor: GOLD }} />
            </div>

            {cards.map((c, i) => (
              <div key={i}
                className="commit-card flex items-start gap-4 bg-[#111] border border-white/6 rounded-2xl px-6 py-5 transition-all duration-300"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${GOLD}30`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${GOLD}15`, color: GOLD }}>
                  {c.icon}
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold mb-1">{c.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: `${GOLD}40` }} />
              </div>
            ))}

            {/* Partnership note */}
            <div className="flex items-center gap-4 rounded-2xl px-6 py-4 border mt-1"
              style={{ background: `linear-gradient(to right, ${GOLD}0d, transparent)`, borderColor: `${GOLD}20` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${GOLD}20` }}>
                <ShieldCheck className="w-4 h-4" style={{ color: GOLD }} />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Exclusive UK partner for <span className="font-semibold" style={{ color: GOLD }}>Aardha Enterprises</span> — trusted by 500+ clients across India.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8A951]/25 to-transparent" />
    </section>
  );
}
