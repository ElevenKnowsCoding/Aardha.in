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
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">+91 9810453680</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4 text-[#FFD700]" />
                <span className="text-sm">Rkbhalla91@outlook.com</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                <span className="text-sm">Plot No 952, Sector-32, Yeida Industrial Area,<br />Greater Noida, Uttar Pradesh - 203135</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-1 group">
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
                  <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm flex items-center gap-1 group">
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Factory Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Visit Our Factory</h4>
            <a
              href="https://maps.app.goo.gl/ePGqnxBwKrJEnf8j6"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-xl overflow-hidden border border-white/10 hover:border-[#FFD700]/50 transition-colors group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.5!2d77.5!3d28.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cbf000000001%3A0x0!2sPlot+No+952+Sector+32+Greater+Noida!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block', pointerEvents: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-[#FFD700] text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Open Maps
                </span>
              </div>
            </a>
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
            
            <a
              href="https://arsh/aardha.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD700] text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#e6c200] transition-colors"
            >
              Visit Arsh
            </a>
            
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
                href="mailto:Rkbhalla91@outlook.com"
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
