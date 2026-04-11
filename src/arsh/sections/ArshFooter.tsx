import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter } from 'lucide-react';

const GOLD = '#C8A951';

const links = [
  { name: 'About',      href: '#about' },
  { name: 'Industries', href: '#industries' },
  { name: 'Why Us',     href: '#why-us' },
  { name: 'Director',   href: '#director' },
  { name: 'Contact',    href: '#contact' },
];

export default function ArshFooter() {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-black"
                style={{ backgroundColor: GOLD }}>A</div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Arsh <span style={{ color: GOLD }}>Solution Ltd</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              Exclusive UK partner for Aardha Enterprises — precision rubber components for
              infrastructure, engineering, and industrial applications.
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: <Phone className="w-3.5 h-3.5" />, text: '+44 (0)7429 285634' },
                { icon: <Mail className="w-3.5 h-3.5" />,  text: 'Sghafari@arshsolution.co.uk' },
                { icon: <MapPin className="w-3.5 h-3.5" />,text: '128 City Road, London, EC1V 2NX' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-gray-500">
                  <span style={{ color: GOLD }}>{item.icon}</span>
                  <span className="text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5">Navigation</h4>
            <ul className="space-y-3">
              {links.map(l => (
                <li key={l.name}>
                  <a href={l.href} onClick={e => go(e, l.href)}
                    className="text-gray-500 text-sm flex items-center gap-1 group transition-colors"
                    onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={e => (e.currentTarget.style.color = '')}>
                    {l.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="/" className="text-sm flex items-center gap-1 font-medium transition-colors"
                  style={{ color: GOLD }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#b8993f')}
                  onMouseLeave={e => (e.currentTarget.style.color = GOLD)}>
                  Visit Aardha Enterprises <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Arsh Solution Ltd. All rights reserved.</p>
          <p className="text-gray-700 text-xs">Exclusive UK Partner · <span style={{ color: `${GOLD}80` }}>Aardha Enterprises India</span></p>
          <div className="flex gap-3">
            {[
              { icon: <Twitter className="w-4 h-4" />,  href: '#' },
              { icon: <Linkedin className="w-4 h-4" />, href: '#' },
              { icon: <Mail className="w-4 h-4" />,     href: 'mailto:Sghafari@arshsolution.co.uk' },
            ].map((s, i) => (
              <a key={i} href={s.href}
                className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-500 transition-all"
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = GOLD; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1A1A1A'; e.currentTarget.style.color = ''; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
