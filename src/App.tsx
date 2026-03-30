import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './sections/Hero';
import Products from './sections/Products';
import About from './sections/About';
import Founder from './sections/Founder';
import Industries from './sections/Industries';
import Benefits from './sections/Benefits';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <Products />
        <Founder />
        <About />
        <Industries />
        <Benefits />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
