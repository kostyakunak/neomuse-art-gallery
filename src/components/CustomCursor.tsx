import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );

      if (Math.random() > 0.7) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          scale: 1,
        };
        setParticles((prev) => [...prev, newParticle]);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.05,
            scale: p.scale + 0.05,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`w-8 h-8 border-2 border-white rounded-full transition-all duration-200 ${
            isPointer ? 'scale-150 bg-white/20' : ''
          }`}
        />
        <div className="absolute inset-0 blur-md bg-white/30 rounded-full animate-pulse" />
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) scale(${particle.scale})`,
            opacity: particle.opacity,
          }}
        >
          <div className="w-2 h-2 bg-blue-400 rounded-full blur-sm" />
        </div>
      ))}
    </>
  );
}
