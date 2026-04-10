import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AllProductsPage from './pages/AllProductsPage';
import ArshApp from './arsh/ArshApp';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function AardhaMain() {
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => { ScrollTrigger.getAll().forEach(st => st.kill()); };
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] min-h-screen overflow-x-hidden">
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]" />
      <Navigation />
      <main>
        <Hero />
        <Products />
        <Founder />
        <About />
        <Industries />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AardhaMain />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/arsh/*" element={<ArshApp />} />
      </Routes>
    </BrowserRouter>
  );
}
