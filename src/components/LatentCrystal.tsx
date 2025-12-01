import { useState, useRef, useEffect } from 'react';

interface Variation {
  name: string;
  imageUrl: string;
  position: number;
}

interface LatentCrystalProps {
  title: string;
  subtitle: string;
  variations: Variation[];
  color: string;
}

export default function LatentCrystal({ title, subtitle, variations, color }: LatentCrystalProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [abstractionLevel, setAbstractionLevel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 20;
        const rotateX = ((y - centerY) / centerY) * -20;
        setRotation({ x: rotateX, y: rotateY });

        const normalizedX = x / rect.width;
        const level = normalizedX * 100;
        setAbstractionLevel(level);

        let selectedIndex = 0;
        for (let i = 0; i < variations.length; i++) {
          if (level >= variations[i].position) {
            selectedIndex = i;
          }
        }
        setActiveIndex(selectedIndex);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [variations]);

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-gray-500 uppercase tracking-wider">{subtitle}</p>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[16/10] rounded-3xl overflow-hidden group"
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          className="w-full h-full relative transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-purple-50/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50">
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {variations.map((variation, index) => (
                <img
                  key={variation.name}
                  src={variation.imageUrl}
                  alt={variation.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{
                    opacity: index === activeIndex ? 0.7 : 0,
                  }}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
            </div>

            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${color}40 0%, transparent 70%)`,
              }}
            />

            <div className="absolute top-6 right-6">
              <div
                className="w-3 h-3 rounded-full shadow-lg animate-pulse"
                style={{ backgroundColor: color }}
              />
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  ${color}10 10px,
                  ${color}10 11px
                )`,
              }}
            />
          </div>

          <div
            className="absolute -inset-4 rounded-3xl opacity-50 blur-2xl -z-10 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}10)`,
              opacity: rotation.x !== 0 || rotation.y !== 0 ? 0.7 : 0.3,
            }}
          />
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <p
              className="text-2xl font-bold tracking-tight"
              style={{ color }}
            >
              {variations[activeIndex].name}
            </p>
            <p className="text-xs text-gray-500 mt-1">Current variation</p>
          </div>

          <div className="flex gap-2">
            {variations.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === activeIndex ? color : '#d1d5db',
                  transform: index === activeIndex ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Realistic</span>
          <span>Abstract</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
            style={{
              width: `${abstractionLevel}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <div className="flex justify-between text-xs">
          {variations.map((variation) => (
            <button
              key={variation.name}
              className={`px-3 py-1.5 rounded-lg transition-all duration-300 ${
                variations[activeIndex].name === variation.name
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={
                variations[activeIndex].name === variation.name
                  ? { backgroundColor: color, color: 'white' }
                  : {}
              }
              onMouseEnter={() => setActiveIndex(variations.indexOf(variation))}
            >
              {variation.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
