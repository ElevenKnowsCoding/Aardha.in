import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Menu, X, ChevronDown, Shield, Wrench, Globe, Star } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Products', href: '#products' },
  { name: 'Industries', href: '#industries' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

const products = [
  { title: 'Extruded Rubber Profiles', desc: 'Custom profiles for sealing, insulation, and protection across all applications.', icon: '⬛' },
  { title: 'Moulded Rubber Parts', desc: 'Precision components manufactured to your exact specifications and drawings.', icon: '🔩' },
  { title: 'Infrastructure Components', desc: 'Bridge bearing pads, waterstops, expansion joints for civil engineering.', icon: '🏗️' },
  { title: 'Gaskets & Seals', desc: 'Industrial gaskets and seals for pipelines, flanges, and hygienic systems.', icon: '⭕' },
  { title: 'Anti-Vibration Parts', desc: 'Rubber bushes, cushion pads, and mounts for vibration isolation.', icon: '🔧' },
  { title: 'Custom Solutions', desc: 'Bespoke parts developed from your drawings, samples, or specifications.', icon: '✏️' },
];

const industries = [
  { name: 'Metro & Rail Construction', desc: 'Rubber cushion pads, track components, tunnel seals, segment casting parts.' },
  { name: 'Highway & Bridge Projects', desc: 'Bridge bearing pads, rebar caps, expansion joints, couplers.' },
  { name: 'Water & Dam Infrastructure', desc: 'Waterstops, eye seals, cement hoses, rock bolt components.' },
  { name: 'Airport Infrastructure', desc: 'Heavy-duty rubber bushes, flange gaskets, dura boards.' },
  { name: 'General Engineering', desc: 'Custom moulded and extruded parts for industrial machinery.' },
  { name: 'Pharmaceutical & Food', desc: 'FDA-grade silicone profiles, TC gaskets, silicone tubes and sheets.' },
];

const reasons = [
  { icon: <Star className="w-6 h-6" />, title: 'Proven Quality', desc: "Aardha's products are trusted by Indian Railways, metro systems, and major infrastructure contractors across India." },
  { icon: <Globe className="w-6 h-6" />, title: 'UK-Based Support', desc: 'As your local partner, Shafi provides direct communication, technical support, and reliable service from London.' },
  { icon: <Wrench className="w-6 h-6" />, title: 'Custom Manufacturing', desc: 'Need a specific part? We develop components to your exact drawings and specifications with no minimum order limits.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Cost-Effective Solutions', desc: 'Benefit from world-class Indian manufacturing at competitive prices, without compromising on quality.' },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C8A951] rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-sm">A</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Arsh <span className="text-[#C8A951]">Solution</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a key={l.name} href={l.href} onClick={(e) => scrollTo(e, l.href)}
                className="text-sm text-gray-300 hover:text-[#C8A951] transition-colors">{l.name}</a>
            ))}
            <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}
              className="bg-[#C8A951] text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b8993f] transition-colors">
              Get a Quote
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map(l => (
            <a key={l.name} href={l.href} onClick={(e) => scrollTo(e, l.href)}
              className="text-2xl text-white hover:text-[#C8A951] transition-colors font-display">{l.name}</a>
          ))}
          <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}
            className="bg-[#C8A951] text-black px-8 py-3 rounded-full font-semibold">Get a Quote</a>
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white"><X className="w-8 h-8" /></button>
        </div>
      )}
    </>
  );
}

export default function ArshApp() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <Nav />

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(200,169,81,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,81,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C8A951]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-[#C8A951]/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C8A951]/70 mb-6 font-medium">UK Partner · Aardha Enterprises India</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
              Precision Rubber<br />
              Components for<br />
              <span className="text-[#C8A951]">UK Infrastructure</span><br />
              & Engineering
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10">
              Arsh Solution Ltd is the exclusive UK partner for Aardha Enterprises — an Indian manufacturer with over 20 years of experience supplying critical rubber parts to metro, rail, and infrastructure projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" onClick={(e) => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="bg-[#C8A951] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#b8993f] transition-all flex items-center gap-2">
                Explore Our Products <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-[#C8A951] hover:text-[#C8A951] transition-all">
                Request a Quote
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#C8A951]" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#C8A951]/60 mb-4 font-medium">About Us</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Bridging World-Class<br />
                <span className="text-[#C8A951]">Indian Manufacturing</span><br />
                with UK Industry
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Arsh Solution Ltd was established to bridge the gap between world-class Indian manufacturing and the UK's demanding infrastructure and engineering sectors. As the exclusive UK partner for Aardha Enterprises, we bring over two decades of precision rubber manufacturing expertise directly to British clients.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Our mission is simple: to provide reliable, high-quality rubber components that meet the exacting standards of UK industry — backed by local support and direct communication.
              </p>

              <div className="bg-[#111] border border-white/6 rounded-2xl p-6 mb-6">
                <p className="text-xs uppercase tracking-widest text-[#C8A951]/60 mb-3 font-medium">Meet Your Director</p>
                <h3 className="text-xl font-bold text-white mb-2">Shafi Ghafari</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Based in London, Shafi personally oversees every client relationship at Arsh Solution Ltd. He holds an MSc in Biomedical Sciences from Middlesex University and brings experience as CEO of Digi Prime Ltd and as a Pharmacovigilance Associate — disciplines that demand the same attention to detail required in precision manufacturing.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Fluent in Dutch and English, Shafi provides direct, professional technical support to all UK clients.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#111] border border-white/6 rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-[#C8A951]/60 mb-3 font-medium">Our Partnership</p>
                <h3 className="text-lg font-bold text-white mb-3">Aardha Enterprises, India</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Aardha Enterprises is a premier Indian manufacturer of precision rubber parts, established over 20 years ago in Delhi. They specialise in both extruded and moulded rubber products for critical infrastructure applications.
                </p>
                <div className="space-y-2">
                  {['Metro Rail & Bullet Train Projects', 'National Highway & Bridge Construction', 'Dam & Water Management Projects', 'Airport Infrastructure', 'Pharmaceutical & Industrial Applications'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#C8A951] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#111] border border-white/6 rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-[#C8A951]/60 mb-3 font-medium">Our Capabilities</p>
                <div className="space-y-3">
                  {[
                    ['Extensive Product Range', 'From rubber gaskets and seals to bridge bearing pads and custom-moulded components.'],
                    ['Custom Development', "Send us your drawings or samples — we'll develop the perfect part for your application."],
                    ['Material Expertise', 'Guidance on Neoprene, EPDM, Silicone, Viton, Natural Rubber and more.'],
                    ['Reliable Supply', 'We manage the entire process from manufacturing in India to delivery at your UK site.'],
                  ].map(([title, desc], i) => (
                    <div key={i}>
                      <p className="text-white text-sm font-semibold">{title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A951]/60 mb-4 font-medium">What We Supply</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our <span className="text-[#C8A951]">Products</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Custom parts manufactured to your specifications — from single prototypes to large-scale supply.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/6 rounded-2xl p-6 hover:border-[#C8A951]/30 hover:bg-[#141414] transition-all duration-300 group">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-white font-bold mb-2 group-hover:text-[#C8A951] transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-[#C8A951]/10 border border-[#C8A951]/20 rounded-2xl px-6 py-4">
              <CheckCircle className="w-5 h-5 text-[#C8A951]" />
              <p className="text-gray-300 text-sm"><span className="text-[#C8A951] font-semibold">Custom parts manufactured to your specifications</span> — send us your drawings or samples</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#C8A951]/60 mb-4 font-medium">Sectors We Serve</p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Industries We <span className="text-[#C8A951]">Serve</span>
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed border-l-2 border-[#C8A951]/30 pl-5">
              Our rubber components are trusted across the most demanding sectors in UK infrastructure and engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <div key={i} className="bg-[#111] border border-white/6 rounded-2xl p-6 hover:border-[#C8A951]/30 transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-[#C8A951] mb-4" />
                <h3 className="text-white font-bold mb-2">{ind.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" className="py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.35em] text-[#C8A951]/60 mb-4 font-medium">Why Choose Us</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why Choose <span className="text-[#C8A951]">Arsh Solution</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {reasons.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/6 rounded-2xl p-7 hover:border-[#C8A951]/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] mb-4 group-hover:bg-[#C8A951]/20 transition-colors">
                  {r.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#C8A951]/15 to-transparent border border-[#C8A951]/20 rounded-3xl p-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-3">Ready to discuss your project?</h3>
            <p className="text-gray-400 mb-8">Contact us today for a quote or technical consultation.</p>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 bg-[#C8A951] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#b8993f] transition-colors">
              Contact Us Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#C8A951]/60 mb-4 font-medium">Get In Touch</p>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Let's <span className="text-[#C8A951]">Talk</span></h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                Whether you need a single custom part or regular supply for major infrastructure projects, we are here to support you.
              </p>

              <div className="space-y-5">
                {[
                  { icon: <Phone className="w-5 h-5" />, label: 'Office', value: '+44 (0)20 8848 81065' },
                  { icon: <Phone className="w-5 h-5" />, label: 'Mobile', value: '+44 (0)7429 285634' },
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'Sghafari@arshsolution.co.uk' },
                  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: '128 City Road, London, EC1V 2NX, United Kingdom' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-[#C8A951]/10 flex items-center justify-center text-[#C8A951] flex-shrink-0 group-hover:bg-[#C8A951]/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#111] border border-white/6 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Name</label>
                    <input type="text" placeholder="Your name" className="w-full bg-[#1a1a1a] border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A951]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Company</label>
                    <input type="text" placeholder="Company name" className="w-full bg-[#1a1a1a] border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A951]/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full bg-[#1a1a1a] border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A951]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Message</label>
                  <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full bg-[#1a1a1a] border border-white/8 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C8A951]/50 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#C8A951] text-black py-4 rounded-xl font-bold text-lg hover:bg-[#b8993f] transition-colors flex items-center justify-center gap-2">
                  Send Message <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#C8A951] rounded-lg flex items-center justify-center">
              <span className="text-black font-black text-xs">A</span>
            </div>
            <span className="text-white font-bold">Arsh <span className="text-[#C8A951]">Solution Ltd</span></span>
          </div>
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Arsh Solution Ltd. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Exclusive UK Partner · <span className="text-[#C8A951]">Aardha Enterprises India</span></p>
        </div>
      </footer>
    </div>
  );
}
