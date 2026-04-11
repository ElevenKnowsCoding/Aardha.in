import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOLD = '#C8A951';

const contactItems = [
  { icon: <Phone className="w-5 h-5" />, label: 'Office',  value: '+44 (0)20 8848 81065' },
  { icon: <Phone className="w-5 h-5" />, label: 'Mobile',  value: '+44 (0)7429 285634' },
  { icon: <Mail className="w-5 h-5" />,  label: 'Email',   value: 'Sghafari@arshsolution.co.uk' },
  { icon: <MapPin className="w-5 h-5" />,label: 'Address', value: '128 City Road, London, EC1V 2NX' },
];

export default function ArshContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({ name: '', company: '', email: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setData({ name: '', company: '', email: '', message: '' }); }, 3000);
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(p => ({ ...p, [e.target.name]: e.target.value }));

  const inputClass = "w-full bg-transparent border-b-2 border-white/10 text-white py-3 text-sm focus:outline-none transition-colors placeholder-gray-600";

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.07]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C8A951]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div ref={leftRef} className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] mb-4 font-medium" style={{ color: `${GOLD}80` }}>
                Get In Touch
              </p>
              <h2 className="text-5xl md:text-6xl font-bold font-display leading-[0.95] tracking-tight mb-6">
                Let's build<br />
                <span style={{ color: GOLD }}>something great.</span>
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Whether you need a single custom part or regular supply for major infrastructure projects,
                contact Shafi directly for a fast, professional response.
              </p>
            </div>

            <div className="space-y-5">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/8 transition-all"
                    style={{ color: GOLD, backgroundColor: `${GOLD}10` }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white text-sm font-medium mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <form ref={formRef} onSubmit={submit}
              className="bg-[#111] border border-white/6 rounded-3xl p-8 lg:p-10">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: GOLD }}>
                    <CheckCircle className="w-8 h-8 text-black" />
                  </div>
                  <p className="text-white font-bold text-xl mb-1">Message Sent!</p>
                  <p className="text-gray-500 text-sm">We'll get back to you soon.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-display">Send a message</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { name: 'name',    label: 'Name',    ph: 'Your name' },
                      { name: 'company', label: 'Company', ph: 'Company name' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">{f.label}</label>
                        <input type="text" name={f.name} value={(data as Record<string,string>)[f.name]}
                          onChange={change} placeholder={f.ph} className={inputClass}
                          onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                          onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Email</label>
                    <input type="email" name="email" value={data.email} onChange={change} required
                      placeholder="your@email.com" className={inputClass}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Message</label>
                    <textarea name="message" value={data.message} onChange={change} required rows={4}
                      placeholder="Tell us about your requirements..." className={`${inputClass} resize-none`}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = GOLD)}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)')} />
                  </div>

                  <button type="submit"
                    className="magnetic-btn w-full py-4 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 transition-colors mt-2"
                    style={{ backgroundColor: GOLD }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8993f')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}>
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
