import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Products', href: '#products' },
  { name: 'Industries', href: '#industries' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = href === '#' ? document.documentElement : document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Single fixed nav — logo always in same position */}
      <nav className="fixed top-0 left-0 w-full z-50">
        {/* Glass background fades in after hero */}
        <div className={`absolute inset-0 transition-opacity duration-500 glass-dark ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="relative px-6 lg:px-12 py-4 flex items-center justify-between max-w-7xl mx-auto">

          {/* Logo — always visible, never moves */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/logo.jpeg" alt="Aardha" className="h-12 w-auto object-contain rounded-lg" />
            <span className="text-2xl font-bold font-display text-white tracking-tighter">
              AAR<span className="text-[#FFD700]">DHA</span>
            </span>
          </a>

          {/* Desktop links — fade in after hero */}
          <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-gray-300 hover:text-[#FFD700] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Visit Arsh — always visible on desktop */}
          <a
            href="/arsh"
            className="hidden md:block bg-[#FFD700] text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#e6c200] transition-colors flex-shrink-0"
          >
            Visit Arsh
          </a>

          {/* Right side — Visit Arsh always visible, hamburger after scroll */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/arsh"
              className="bg-[#FFD700] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e6c200] transition-colors"
            >
              Visit Arsh
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-10 h-10 flex items-center justify-center text-white transition-all duration-500 ${scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none absolute'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 bg-black z-40 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-3xl text-white hover:text-[#FFD700] transition-colors font-display"
            >
              {link.name}
            </a>
          ))}
          <a href="/arsh" className="text-3xl text-[#FFD700] font-display">
            Visit Arsh
          </a>
        </div>
        <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white">
          <X className="w-8 h-8" />
        </button>
      </div>
    </>
  );
}
