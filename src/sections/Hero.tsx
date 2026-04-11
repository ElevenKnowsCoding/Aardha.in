import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const rubberParts = [
  { name: 'Rubber Bush',   description: 'Flanged bush for vibration isolation & heavy loads' },
  { name: 'Rebar Cap',     description: 'Safety cap for exposed reinforcement bars on sites' },
  { name: 'Flange Gasket', description: 'Industrial pipeline sealing with bolt pattern' },
  { name: 'Coupler',       description: 'Precision rebar coupler for structural continuity' },
];

function RubberMat({ color = '#1a1a1a', roughness = 0.88 }: { color?: string; roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={roughness}
      metalness={0.0}
      clearcoat={0.15}
      clearcoatRoughness={0.45}
      envMapIntensity={1.4}
      reflectivity={0.1}
    />
  );
}

// 1. RUBBER BUSH — 2 identical hollow cylinders stacked bottom-to-bottom
function RubberBush() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.42;
    g.current.rotation.x = 0.28 + Math.sin(clock.elapsedTime * 0.5) * 0.08;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.7) * 0.07;
  });
  return (
    <group ref={g} scale={1.0}>
      {/* Top cylinder */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 1.0, 80, 1, true]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Top cap */}
      <mesh receiveShadow position={[0, 1.0, 0]} rotation={[Math.PI, 0, 0]}>
        <ringGeometry args={[0.25, 0.65, 80]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Bottom cylinder — flipped, wider */}
      <mesh castShadow receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 1.0, 80, 1, true]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Bottom cap */}
      <mesh receiveShadow position={[0, -1.0, 0]}>
        <ringGeometry args={[0.25, 0.95, 80]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Shared middle face */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.25, 0.95, 80]} />
        <RubberMat color="#222" />
      </mesh>
      {/* Hollow bore */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 2.05, 48]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
    </group>
  );
}

// 2. REBAR CAP — flat mushroom-head cap: wide flat disc top + short tapered plug
function RebarCap() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.38;
    g.current.rotation.x = 0.25 + Math.sin(clock.elapsedTime * 0.45) * 0.12;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.08;
  });
  return (
    <group ref={g} scale={1.05}>
      {/* Wide flat disc top */}
      <mesh castShadow receiveShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.22, 80]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Slight chamfer on top edge */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[1.1, 0.98, 0.06, 80]} />
        <RubberMat color="#222" />
      </mesh>
      {/* Chamfer on bottom edge of disc */}
      <mesh castShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.98, 1.1, 0.06, 80]} />
        <RubberMat color="#222" />
      </mesh>
      {/* Short tapered plug / stem */}
      <mesh castShadow receiveShadow position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.52, 0.44, 0.72, 64]} />
        <RubberMat color="#1c1c1c" />
      </mesh>
      {/* Plug bottom rim */}
      <mesh castShadow position={[0, -0.78, 0]}>
        <torusGeometry args={[0.44, 0.04, 12, 64]} />
        <RubberMat color="#252525" />
      </mesh>
      {/* Inner bore hole through plug */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.76, 32]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      {/* Concentric ring detail on top disc */}
      {[0.55, 0.82].map((r, i) => (
        <mesh key={i} castShadow position={[0, 0.24, 0]}>
          <torusGeometry args={[r, 0.018, 10, 80]} />
          <RubberMat color="#252525" />
        </mesh>
      ))}
      {/* Grip ribs on plug */}
      {[-0.28, -0.52].map((y, i) => (
        <mesh key={i} castShadow position={[0, y, 0]}>
          <torusGeometry args={[0.535, 0.022, 10, 64]} />
          <RubberMat color="#222" />
        </mesh>
      ))}
    </group>
  );
}

// 3. FLANGE GASKET — flat ring with 8 bolt holes, outer & inner sealing beads
function FlangeGasket() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.x = 0.26 + Math.sin(clock.elapsedTime * 0.38) * 0.1;
    g.current.rotation.y = clock.elapsedTime * 0.3;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.82) * 0.08;
  });
  return (
    <group ref={g} scale={1.05}>
      {/* Main flat ring body */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.94, 0.35, 5, 80]} />
        <RubberMat color="#1e1e1e" />
      </mesh>
      {/* Outer sealing bead */}
      <mesh castShadow>
        <torusGeometry args={[1.29, 0.062, 18, 80]} />
        <RubberMat color="#2b2b2b" roughness={0.72} />
      </mesh>
      {/* Inner sealing bead */}
      <mesh castShadow>
        <torusGeometry args={[0.59, 0.062, 18, 80]} />
        <RubberMat color="#2b2b2b" roughness={0.72} />
      </mesh>
      {/* 8 bolt holes */}
      {Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2).map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.94, Math.sin(angle) * 0.94, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.76, 18]} />
          <meshStandardMaterial color="#050505" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

// 4. COUPLER — threaded rebar coupler, cylindrical with hex body & threaded ends
function Coupler() {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * 0.4;
    g.current.rotation.x = 0.38 + Math.sin(clock.elapsedTime * 0.45) * 0.08;
    g.current.position.y = Math.sin(clock.elapsedTime * 0.65) * 0.08;
  });
  return (
    <group ref={g} scale={1.05}>
      {/* Hex body centre */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.62, 1.1, 6]} />
        <RubberMat color="#1e1e1e" />
      </mesh>
      {/* Threaded end top — tapered cylinder with thread rings */}
      <mesh castShadow receiveShadow position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.38, 0.44, 0.56, 40]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Threaded end bottom */}
      <mesh castShadow receiveShadow position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.44, 0.38, 0.56, 40]} />
        <RubberMat color="#1a1a1a" />
      </mesh>
      {/* Thread rings top */}
      {[0.62, 0.74, 0.86, 0.98, 1.1].map((y, i) => (
        <mesh key={i} castShadow position={[0, y, 0]}>
          <torusGeometry args={[0.41, 0.028, 10, 40]} />
          <RubberMat color="#252525" />
        </mesh>
      ))}
      {/* Thread rings bottom */}
      {[-0.62, -0.74, -0.86, -0.98, -1.1].map((y, i) => (
        <mesh key={i} castShadow position={[0, y, 0]}>
          <torusGeometry args={[0.41, 0.028, 10, 40]} />
          <RubberMat color="#252525" />
        </mesh>
      ))}
      {/* Bore hole */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 32]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      {/* Hex edge highlights */}
      {Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2).map((a, i) => (
        <mesh key={i} castShadow position={[Math.cos(a) * 0.62, 0, Math.sin(a) * 0.62]}>
          <boxGeometry args={[0.04, 1.12, 0.04]} />
          <RubberMat color="#2a2a2a" />
        </mesh>
      ))}
    </group>
  );
}

function AmbientGlow() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const r1 = isMobile ? 2.2 : 3.5;
  const r2 = isMobile ? 1.7 : 2.8;

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.1;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.15;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  if (isMobile) return <group />;

  return (
    <group>
      <mesh ref={ring1Ref} position={[0, 0, -2]}>
        <torusGeometry args={[r1, 0.02, 16, 100]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, -1.5]}>
        <torusGeometry args={[r2, 0.015, 16, 80]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}



const PARTS = [RubberBush, RebarCap, FlangeGasket, Coupler];

function Scene3D({ currentIndex }: { currentIndex: number }) {
  const Part = PARTS[currentIndex];
  return (
    <>
      {/* Studio lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]}   intensity={2.5} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[0, -4, 2]}  intensity={0.3} color="#FFD700" />
      <pointLight position={[3, 3, 3]}  intensity={1.2} color="#FFD700" distance={12} />
      <pointLight position={[-3, 1, -2]} intensity={0.5} color="#ffffff" distance={10} />
      <spotLight position={[0, 8, 0]} intensity={1.5} angle={0.4} penumbra={0.6} castShadow />
      <AmbientGlow />
      <Part />
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
  const partInfoRef = useRef<HTMLDivElement>(null);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  useEffect(() => {
    const rings = document.querySelector('.hero-rings') as HTMLElement | null;
    const handleScroll = () => {
      if (!rings) return;
      const heroHeight = sectionRef.current?.offsetHeight ?? window.innerHeight;
      rings.style.opacity = window.scrollY > heroHeight * 0.5 ? '0' : '1';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rings) rings.style.opacity = '0';
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartIndex((prev) => (prev + 1) % rubberParts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (partInfoRef.current) {
      gsap.fromTo(partInfoRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentPartIndex]);

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

  const currentPart = rubberParts[currentPartIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] flex flex-col lg:min-h-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50 z-10" />
        <img src="/images/hero/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 z-[1]" />

      {/* Decorative rings - single set, aligned with 3D canvas */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        <div className="hidden lg:flex absolute inset-0 items-center justify-center">
          <div className="absolute rounded-full border border-[#FFD700]/25" style={{ width: '90vmin', height: '90vmin' }} />
          <div className="absolute rounded-full border border-[#FFD700]/15" style={{ width: '68vmin', height: '68vmin' }} />
          <div className="absolute rounded-full bg-[#FFD700]/5 blur-3xl" style={{ width: '50vmin', height: '50vmin' }} />
        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col lg:hidden relative z-20" style={{ height: '100dvh' }}>

        {/* Nav spacer */}
        <div style={{ height: 64 }} />

        {/* Headline */}
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

        {/* 3D canvas — fills remaining space */}
        <div className="flex-1 relative min-h-0">
          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
              <Scene3D currentIndex={currentPartIndex} />
            </Canvas>
          </div>
        </div>

        {/* CTAs + dots — pinned at bottom */}
        <div className="flex flex-col items-center gap-3 px-6 pb-8 pt-3">
          <div className="flex gap-3 justify-center">
            <a href="#contact" className="bg-[#FFD700] text-black px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-[#e6c200] transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#products" className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:border-[#FFD700] hover:text-[#FFD700] transition-colors">
              View Products
            </a>
          </div>
          <div className="flex gap-2">
            {rubberParts.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentPartIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentPartIndex ? 'bg-[#FFD700] w-8' : 'bg-white/20 w-4'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:flex flex-1 items-center relative z-20 w-full max-w-7xl mx-auto px-12 py-32">
        {/* 3D canvas — full background */}
        <div className="absolute inset-0 z-[61] flex items-center justify-center pointer-events-none">
          <div className="w-full h-full max-w-[800px] max-h-[800px]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
              <Scene3D currentIndex={currentPartIndex} />
            </Canvas>
          </div>
        </div>

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

          {/* Right — product info card */}
          <div className="col-span-5 flex flex-col items-end justify-center">
            <div ref={partInfoRef} className="glass-dark rounded-2xl p-6 md:p-8 max-w-sm text-right border border-white/10">
              <p className="text-xs text-[#FFD700]/70 uppercase tracking-[0.2em] mb-3">Featured Product</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentPart.name}</h3>
              <p className="text-gray-400 text-sm md:text-base mb-6">{currentPart.description}</p>
              <div className="flex justify-end gap-2 mb-4">
                {rubberParts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPartIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentPartIndex ? 'bg-[#FFD700] w-10' : 'bg-white/20 w-4 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-xs">
                {String(currentPartIndex + 1).padStart(2, '0')} / {String(rubberParts.length).padStart(2, '0')}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4 glass-dark rounded-xl px-5 py-3 border border-white/5">
              <div className="w-10 h-10 bg-[#FFD700]/20 rounded-full flex items-center justify-center">
                <span className="text-[#FFD700] font-bold text-sm">25+</span>
              </div>
              <div className="text-right">
                <p className="text-white text-sm font-medium">Years of Excellence</p>
                <p className="text-gray-500 text-xs">ISO 9001:2015 Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - desktop only */}
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
