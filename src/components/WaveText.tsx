import { useEffect, useRef, useState } from 'react';

interface WaveTextProps {
  text: string;
  className?: string;
}

export default function WaveText({ text, className = '' }: WaveTextProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {text.split('').map((char, index) => {
        const distance = containerRef.current
          ? Math.hypot(
              mousePosition.x - (index * 40 + 20),
              mousePosition.y - 20
            )
          : 300;

        const scale = Math.max(1, 1.5 - distance / 200);
        const rotateX = (mousePosition.y - 20) / 10;
        const rotateY = (mousePosition.x - (index * 40 + 20)) / 10;

        return (
          <span
            key={index}
            className="inline-block transition-all duration-200 ease-out"
            style={{
              transform: `perspective(500px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              textShadow:
                distance < 100
                  ? `0 0 20px rgba(59, 130, 246, ${1 - distance / 100})`
                  : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
}
