import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const GOLD = '#C8A951';

const navLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Industries', href: '#industries' },
  { name: 'Why Us',     href: '#why-us' },
  { name: 'Director',   href: '#director' },
  { name: 'Contact',    href: '#contact' },
];

export default function ArshNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-dark border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex-shrink-0">
            <span className="text-white font-bold text-lg tracking-tight font-display">
              Arsh <span style={{ color: GOLD }}>Solution</span>
            </span>
          </a>

          <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {navLinks.map(l => (
              <a key={l.name} href={l.href} onClick={(e) => scrollTo(e, l.href)}
                className="text-sm text-gray-300 hover:text-[#C8A951] transition-colors relative group">
                {l.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C8A951] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a href="/"
            className="hidden md:block px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0"
            style={{ backgroundColor: GOLD, color: '#000' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8993f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}>
            Visit Aardha
          </a>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map(l => (
          <a key={l.name} href={l.href} onClick={(e) => scrollTo(e, l.href)}
            className="text-2xl text-white hover:text-[#C8A951] transition-colors font-display">{l.name}</a>
        ))}
        <a href="/"
          className="px-8 py-3 rounded-full font-semibold text-black" style={{ backgroundColor: GOLD }}>
          Visit Aardha
        </a>
        <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white">
          <X className="w-8 h-8" />
        </button>
      </div>
    </>
  );
}
