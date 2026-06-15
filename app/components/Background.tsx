'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

// Deterministic values so SSR and client markup match (avoids hydration mismatch).
function particleAt(index: number): Particle {
  const left = ((index * 37 + 13) % 97) + 1;
  const top = ((index * 53 + 7) % 93) + 2;
  const duration = 4 + ((index * 11) % 50) / 10;
  const delay = ((index * 17) % 20) / 10;
  return { id: index, left, top, duration, delay };
}

const particles: Particle[] = Array.from({ length: 36 }, (_, i) => particleAt(i));

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#090B13]" />

      <div
        className="absolute -top-24 -left-16 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[20%] -right-20 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 72%)' }}
      />
      <div
        className="absolute -bottom-24 left-[25%] w-[36rem] h-[36rem] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)' }}
      />

      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.18) 0%, rgba(139,92,246,0.18) 18%, rgba(34,211,238,0.08) 38%, transparent 58%)`,
          transition: 'background 0.3s ease-out',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.28) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-sm opacity-40"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: particle.id % 2 === 0 ? '#8B5CF6' : '#22D3EE',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
