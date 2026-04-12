import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function AardhaLogoMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.5;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.28) * 0.1;
  });

  const depth = 0.44;
  const extOpts = { depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.02, bevelSegments: 4 };

  const triangle = new THREE.Shape();
  triangle.moveTo( 0.08,  0.65);
  triangle.lineTo(-0.22, -0.07);
  triangle.lineTo( 0.38, -0.07);
  triangle.closePath();

  const para = new THREE.Shape();
  para.moveTo( 0.08, -0.07);
  para.lineTo( 0.38, -0.07);
  para.lineTo( 0.868, -1.10);
  para.lineTo( 0.568, -1.10);
  para.closePath();

  const trap = new THREE.Shape();
  trap.moveTo(-0.491, -0.72);
  trap.lineTo(-0.191, -0.72);
  trap.lineTo(-0.033, -1.10);
  trap.lineTo(-0.649, -1.10);
  trap.closePath();

  const mat = (
    <meshStandardMaterial
      color="#B8960C"
      emissive="#B8960C"
      emissiveIntensity={0.15}
      roughness={0.35}
      metalness={0.1}
    />
  );

  // Bounding box: x[-0.649, 0.868] y[-1.10, 0.65]
  // midX=0.1095, midY=-0.225 => offset to center
  return (
    <group ref={groupRef} scale={1.25} position={[-0.11, 0.225, 0]}>
      <mesh castShadow>
        <extrudeGeometry args={[triangle, extOpts]} />
        {mat}
      </mesh>
      <mesh castShadow>
        <extrudeGeometry args={[para, extOpts]} />
        {mat}
      </mesh>
      <mesh castShadow>
        <extrudeGeometry args={[trap, extOpts]} />
        {mat}
      </mesh>
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={3.0} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#fff8dc" />
      <pointLight position={[3, 3, 3]} intensity={2} color="#FFD700" distance={12} />
      <pointLight position={[-3, 1, -2]} intensity={1} color="#ffffff" distance={10} />
      <AardhaLogoMesh />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <Environment preset="studio" />
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (heading) {
        gsap.fromTo(heading.querySelectorAll('.char'),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.03, ease: 'expo.out', delay: 0.3 }
        );
      }
      gsap.fromTo(subheadingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.8 }
      );
      gsap.fromTo(ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 1 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] flex flex-col lg:min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50 z-10" />
        <img src="/images/hero/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 z-[1]" />

      {/* 3D canvas — desktop only */}
      <div className="absolute inset-0 z-[15] pointer-events-none hidden lg:block">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col lg:hidden relative z-20" style={{ height: '100dvh' }}>
        <div style={{ height: 64 }} />
        <div className="flex flex-col items-center text-center px-6 pt-3 pb-2">
          <h1 className="text-[2.4rem] font-bold font-display leading-[1.05] tracking-tight">
            <span className="block text-white">Find the</span>
            <span className="block text-[#FFD700]">better</span>
            <span className="block text-white">quality.</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Precision Rubber Parts &mdash;{' '}
            <span className="text-[#FFD700]">Extruded &amp; Moulded</span>
          </p>
        </div>
        <div className="flex-1 relative min-h-0">
          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
              <Scene3D />
            </Canvas>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 px-6 pb-8 pt-3">
          <div className="border border-[#FFD700]/20 rounded-2xl p-5 w-full bg-[#111]/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <img src="/images/logo.jpeg" alt="Aardha" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[#FFD700] text-xs uppercase tracking-widest font-semibold">About Aardha</p>
                <h3 className="text-white font-bold text-base leading-tight">Aardha Enterprises</h3>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">25+ years of precision rubber manufacturing — trusted by 500+ clients across India's biggest infrastructure projects.</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-[#FFD700]/10 rounded-xl p-2.5 text-center">
                <p className="text-[#FFD700] font-bold text-lg leading-none">25+</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Years</p>
              </div>
              <div className="flex-1 bg-[#FFD700]/10 rounded-xl p-2.5 text-center">
                <p className="text-[#FFD700] font-bold text-lg leading-none">500+</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Clients</p>
              </div>
              <div className="flex-1 bg-[#FFD700]/10 rounded-xl p-2.5 text-center">
                <p className="text-[#FFD700] font-bold text-lg leading-none">ISO</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Certified</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <a href="#contact" className="bg-[#FFD700] text-black px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-[#e6c200] transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#products" className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:border-[#FFD700] hover:text-[#FFD700] transition-colors">
              View Products
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:flex flex-1 items-center relative z-20 w-full max-w-7xl mx-auto px-12 py-32">
        <div className="relative z-[70] grid grid-cols-12 gap-8 items-center w-full min-h-[70vh]">
          {/* Left — headline + CTAs */}
          <div className="col-span-7 space-y-8">
            <h1 ref={headingRef} className="text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-[0.95] tracking-tight">
              <span className="block text-white overflow-hidden">{splitText('Find the')}</span>
              <span className="block text-[#FFD700] overflow-hidden">{splitText('better')}</span>
              <span className="block text-white overflow-hidden">{splitText('quality.')}</span>
            </h1>

            <p ref={subheadingRef} className="text-xl md:text-2xl text-gray-300 max-w-lg opacity-0">
              Precision Rubber Parts
              <span className="block text-[#FFD700] mt-1">Extruded as well Moulded</span>
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <a href="#contact" className="magnetic-btn group bg-[#FFD700] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e6c200] transition-all hover:scale-105 glow flex items-center gap-2">
                Contact Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#products" className="magnetic-btn border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-[#FFD700] hover:text-[#FFD700] transition-all">
                View Products
              </a>
            </div>
          </div>

          {/* Right — stats card */}
          <div className="col-span-4 col-start-9 flex flex-col items-end justify-center gap-4">
            <div className="border border-[#FFD700]/20 rounded-2xl p-6 w-full bg-[#111]/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="/images/logo.jpeg" alt="Aardha" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[#FFD700] text-xs uppercase tracking-widest font-semibold">About Aardha</p>
                  <h3 className="text-white font-bold text-lg leading-tight">Aardha Enterprises</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">25+ years of precision rubber manufacturing — trusted by 500+ clients across India's biggest infrastructure projects.</p>
              <div className="flex gap-3">
                <div className="flex-1 bg-[#FFD700]/10 rounded-xl p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xl leading-none">25+</p>
                  <p className="text-gray-500 text-xs mt-1">Years</p>
                </div>
                <div className="flex-1 bg-[#FFD700]/10 rounded-xl p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xl leading-none">500+</p>
                  <p className="text-gray-500 text-xs mt-1">Clients</p>
                </div>
                <div className="flex-1 bg-[#FFD700]/10 rounded-xl p-3 text-center">
                  <p className="text-[#FFD700] font-bold text-xl leading-none">ISO</p>
                  <p className="text-gray-500 text-xs mt-1">Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#FFD700]" />
      </div>

      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
      <div className="hidden lg:block absolute top-1/3 right-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-[150px] z-[1] pointer-events-none" />
      <div className="hidden lg:block absolute bottom-1/3 left-0 w-60 h-60 bg-[#FFA500]/3 rounded-full blur-[100px] z-[1] pointer-events-none" />
    </section>
  );
}
