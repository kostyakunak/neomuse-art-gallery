import { useState } from 'react';

interface UIFossilProps {
  era: string;
  title: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}

export default function UIFossil({ era, title, description, imageUrl, accentColor }: UIFossilProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowCursor(true);

    setTimeout(() => {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
      });
    }, 100);

    setTimeout(() => {
      setShowCursor(false);
      setGlitchOffset({ x: 0, y: 0 });
    }, 800);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowCursor(false);
    setGlitchOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono px-2 py-1 rounded"
            style={{
              backgroundColor: `${accentColor}20`,
              color: accentColor,
            }}
          >
            {era}
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

        <div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
          style={{
            perspective: '1000px',
          }}
        >
          <div
            className="absolute inset-0 bg-white/80 backdrop-blur-xl transition-all duration-300"
            style={{
              backdropFilter: isHovered ? 'blur(8px)' : 'blur(20px)',
            }}
          >
            <div
              className="absolute inset-0 transition-all duration-300"
              style={{
                transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`,
              }}
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  opacity: isHovered ? 0.9 : 0.4,
                  filter: isHovered
                    ? 'grayscale(0%) contrast(1.1) brightness(1)'
                    : 'grayscale(60%) contrast(0.8) brightness(0.9)',
                }}
              />

              {isHovered && glitchOffset.x !== 0 && (
                <>
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-screen"
                    style={{
                      transform: 'translate(-2px, 1px)',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ filter: 'hue-rotate(180deg)' }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 opacity-30 mix-blend-screen"
                    style={{
                      transform: 'translate(2px, -1px)',
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ filter: 'hue-rotate(-90deg)' }}
                    />
                  </div>
                </>
              )}
            </div>

            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${accentColor}20 0%, transparent 60%)`,
                opacity: isHovered ? 0.6 : 0.2,
              }}
            />

            <div
              className="absolute inset-0 border-2 rounded-2xl transition-all duration-300"
              style={{
                borderColor: isHovered ? `${accentColor}60` : 'transparent',
                boxShadow: isHovered ? `0 0 30px ${accentColor}40` : 'none',
              }}
            />

            {showCursor && (
              <div
                className="absolute w-4 h-6 pointer-events-none animate-pulse"
                style={{
                  left: '50%',
                  top: '50%',
                  backgroundColor: accentColor,
                  boxShadow: `0 0 10px ${accentColor}`,
                }}
              />
            )}

            {isHovered && (
              <div
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
                style={{
                  backgroundColor: accentColor,
                  color: 'white',
                }}
              >
                ACTIVE
              </div>
            )}
          </div>

          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.05) 2px,
                rgba(255, 255, 255, 0.05) 4px
              )`,
              opacity: isHovered ? 0.3 : 0,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 40%, ${accentColor}10 100%)`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Interface Fragment</span>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: isHovered ? accentColor : '#d1d5db',
            }}
          />
        </div>
      </div>
    </div>
  );
}
