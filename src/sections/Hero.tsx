import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Rubber part shapes data with proper industrial forms
const rubberParts = [
  { 
    name: 'Rubber Bush', 
    shape: 'torus',
    description: 'Precision engineered for heavy loads',
    color: '#FFD700'
  },
  { 
    name: 'Silicone Profile', 
    shape: 'extrusion',
    description: 'High-temperature resistant sealing',
    color: '#FFA500'
  },
  { 
    name: 'Eye Seal', 
    shape: 'ring',
    description: 'Watertight tunnel applications',
    color: '#FFD700'
  },
  { 
    name: 'Bridge Bearing', 
    shape: 'pad',
    description: 'Vibration isolation systems',
    color: '#FFA500'
  },
  { 
    name: 'Casting Pad', 
    shape: 'cylinder',
    description: 'Concrete segment protection',
    color: '#FFD700'
  },
];

// Single elegant 3D rubber part that morphs
function MorphingRubberPart({ currentIndex }: { currentIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const targetShape = rubberParts[currentIndex].shape;
  const targetColor = rubberParts[currentIndex].color;

  // Create geometries for different rubber part shapes
  const geometries = useMemo(() => ({
    // Classic rubber bush - thick torus
    torus: new THREE.TorusGeometry(1.2, 0.5, 32, 64),
    // Silicone extrusion profile - elongated torus
    extrusion: new THREE.TorusGeometry(1.5, 0.3, 24, 100),
    // Eye seal - thin ring with hole
    ring: new THREE.TorusGeometry(1.4, 0.2, 32, 64),
    // Bridge bearing pad - rounded box
    pad: new THREE.BoxGeometry(2.2, 0.8, 2.2, 8, 4, 8),
    // Casting cylinder
    cylinder: new THREE.CylinderGeometry(1.3, 1.3, 1, 32),
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      
      // Subtle breathing
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
      meshRef.current.scale.setScalar(breathe);
    }
    
    if (innerRef.current) {
      innerRef.current.rotation.y -= 0.002;
    }
  });

  const currentGeometry = geometries[targetShape as keyof typeof geometries] || geometries.torus;

  return (
    <group>
      {/* Main rubber part */}
      <mesh ref={meshRef} geometry={currentGeometry} castShadow receiveShadow>
        <MeshDistortMaterial
          color={targetColor}
          distort={0.1}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Inner metallic core for bush/ring shapes */}
      {(targetShape === 'torus' || targetShape === 'ring') && (
        <mesh ref={innerRef} scale={0.5}>
          <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
          <meshStandardMaterial 
            color="#444444"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

// Ambient glow effect - subtle rings, not random circles
function AmbientGlow({ currentIndex }: { currentIndex: number }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const color = rubberParts[currentIndex].color;

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

  return (
    <group>
      {/* Outer decorative ring */}
      <mesh ref={ring1Ref} position={[0, 0, -2]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      
      {/* Inner decorative ring */}
      <mesh ref={ring2Ref} position={[0, 0, -1.5]}>
        <torusGeometry args={[2.8, 0.015, 16, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Main 3D Scene
function Scene3D({ currentIndex }: { currentIndex: number }) {
  return (
    <>
      {/* Professional lighting setup */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        color="#FFD700"
        castShadow
      />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#FFA500" />
      <pointLight position={[0, -5, 3]} intensity={0.3} color="#FFFFFF" />
      
      <MorphingRubberPart currentIndex={currentIndex} />
      <AmbientGlow currentIndex={currentIndex} />
      
      <Environment preset="city" />
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

  // Auto-cycle through rubber parts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartIndex((prev) => (prev + 1) % rubberParts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animate part info change
  useEffect(() => {
    if (partInfoRef.current) {
      gsap.fromTo(partInfoRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [currentPartIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const heading = headingRef.current;
      if (heading) {
        const chars = heading.querySelectorAll('.char');
        gsap.fromTo(chars,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.3
          }
        );
      }

      gsap.fromTo(subheadingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.8 }
      );

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 1 }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(headingRef.current, { y: progress * -150 });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const currentPart = rubberParts[currentPartIndex];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-[#0A0A0A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50 z-10" />
        <img
          src="/images/hero/hero-bg.jpg"
          alt="Industrial Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-10 z-[1]" />

      {/* 3D Canvas - Centered */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center">
        <div className="w-full h-full max-w-[800px] max-h-[800px]">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Scene3D currentIndex={currentPartIndex} />
          </Canvas>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
          
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-[0.95] tracking-tight"
            >
              <span className="block text-white overflow-hidden">
                {splitText('Find the')}
              </span>
              <span className="block text-[#FFD700] glow-text overflow-hidden">
                {splitText('better')}
              </span>
              <span className="block text-white overflow-hidden">
                {splitText('quality.')}
              </span>
            </h1>

            <p
              ref={subheadingRef}
              className="text-xl md:text-2xl text-gray-300 max-w-lg opacity-0"
            >
              Precision Rubber Parts
              <span className="block text-[#FFD700] mt-1">Extruded as well Moulded</span>
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <a
                href="#contact"
                className="magnetic-btn group bg-[#FFD700] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#e6c200] transition-all transform hover:scale-105 glow flex items-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#products"
                className="magnetic-btn border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-[#FFD700] hover:text-[#FFD700] transition-all"
              >
                View Products
              </a>
            </div>
          </div>

          {/* Right Content - Product Info - 5 columns */}
          <div className="lg:col-span-5 flex flex-col items-end justify-center">
            <div 
              ref={partInfoRef}
              className="glass-dark rounded-2xl p-6 md:p-8 max-w-sm text-right border border-white/10"
            >
              {/* Label */}
              <p className="text-xs text-[#FFD700]/70 uppercase tracking-[0.2em] mb-3">
                Featured Product
              </p>
              
              {/* Product Name */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {currentPart.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base mb-6">
                {currentPart.description}
              </p>

              {/* Progress Indicators */}
              <div className="flex justify-end gap-2 mb-4">
                {rubberParts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPartIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentPartIndex 
                        ? 'bg-[#FFD700] w-10' 
                        : 'bg-white/20 w-4 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              {/* Counter */}
              <p className="text-gray-600 text-xs">
                {String(currentPartIndex + 1).padStart(2, '0')} / {String(rubberParts.length).padStart(2, '0')}
              </p>
            </div>

            {/* Trust Badge */}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6 text-[#FFD700]" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />

      {/* Side Accent Glows */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-[150px] z-[1] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-60 h-60 bg-[#FFA500]/3 rounded-full blur-[100px] z-[1] pointer-events-none" />
    </section>
  );
}
