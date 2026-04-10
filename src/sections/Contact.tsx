import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Input lines animation
      const inputs = formRef.current?.querySelectorAll('.input-line');
      if (inputs) {
        gsap.fromTo(inputs,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 bg-[#0A0A0A] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Yellow Accent Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFD700] transform skew-x-12 translate-x-1/3 opacity-90 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
                Let's build
                <br />
                <span className="text-[#FFD700]">something great</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Ready to discuss your rubber component needs? Get in touch with our engineering 
                team for custom solutions tailored to your project requirements.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-colors">
                  <Mail className="w-6 h-6 text-[#FFD700] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white font-semibold">Rkbhalla91@outlook.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-colors">
                  <Phone className="w-6 h-6 text-[#FFD700] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-white font-semibold">+91 9810453680</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-[#1A1A1A] border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FFD700] group-hover:border-[#FFD700] transition-colors">
                  <MapPin className="w-6 h-6 text-[#FFD700] group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-white font-semibold">Delhi, India</p>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-4">Need a quick quote?</p>
              <a
                href="tel:+919810453680"
                className="inline-flex items-center gap-2 text-[#FFD700] font-semibold hover:gap-4 transition-all"
              >
                Call us now
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="relative">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-[#1A1A1A] rounded-3xl p-8 lg:p-10 border border-white/5"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>

                  <div className="space-y-6">
                    {/* Name & Company Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b-2 border-white/10 text-white py-3 focus:outline-none focus:border-[#FFD700] transition-colors"
                          placeholder="Your name"
                        />
                        <div className="input-line absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700] transform scale-x-0 origin-left" />
                      </div>
                      <div className="relative">
                        <label className="block text-sm text-gray-400 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-white/10 text-white py-3 focus:outline-none focus:border-[#FFD700] transition-colors"
                          placeholder="Company name"
                        />
                        <div className="input-line absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700] transform scale-x-0 origin-left" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b-2 border-white/10 text-white py-3 focus:outline-none focus:border-[#FFD700] transition-colors"
                        placeholder="your@email.com"
                      />
                      <div className="input-line absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700] transform scale-x-0 origin-left" />
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="block text-sm text-gray-400 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b-2 border-white/10 text-white py-3 focus:outline-none focus:border-[#FFD700] transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                      <div className="input-line absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD700] transform scale-x-0 origin-left" />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="magnetic-btn w-full bg-[#FFD700] text-black py-4 rounded-xl font-bold text-lg hover:bg-[#e6c200] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 mt-8"
                    >
                      Send Message
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFD700]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
