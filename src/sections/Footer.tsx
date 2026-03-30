import { Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'Rubber Bushes', href: '#products' },
    { name: 'Silicone Profiles', href: '#products' },
    { name: 'Eye Seals', href: '#products' },
    { name: 'Casting Pads', href: '#products' },
    { name: 'Bridge Bearings', href: '#products' }
  ],
  industries: [
    { name: 'Highway Projects', href: '#industries' },
    { name: 'Metro Construction', href: '#industries' },
    { name: 'Airport Projects', href: '#industries' },
    { name: 'Dam Projects', href: '#industries' },
    { name: 'Pharma Industries', href: '#industries' }
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Quality', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]
};

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="text-3xl font-bold font-display text-white tracking-tighter mb-6 block">
              AAR<span className="text-[#FFD700]">DHA</span>
            </a>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Precision rubber parts for industrial applications. Quality extruded and moulded 
              rubber components since 1998. ISO 9001:2015 certified.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">+91 981-045-3680</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">info@aardha.in</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Aardha Enterprises. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FFD700] hover:text-black transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FFD700] hover:text-black transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@aardha.in"
                className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#FFD700] hover:text-black transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
