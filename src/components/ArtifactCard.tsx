import { useState, useRef, MouseEvent, useEffect } from 'react';
import { Artifact } from '../lib/supabase';
import { Image as ImageIcon } from 'lucide-react';

interface ArtifactCardProps {
  artifact: Artifact;
  onClick: () => void;
}

export default function ArtifactCard({ artifact, onClick }: ArtifactCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const glitchTimeoutRef = useRef<NodeJS.Timeout>();

  // Сброс ошибки при изменении изображения
  useEffect(() => {
    setImageError(false);
  }, [artifact.image_url]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });

    const magnetX = ((x - centerX) / centerX) * 15;
    const magnetY = ((y - centerY) / centerY) * 15;
    setMagnetOffset({ x: magnetX, y: magnetY });

    if (Math.random() > 0.95) {
      setIsGlitching(true);
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
      glitchTimeoutRef.current = setTimeout(() => setIsGlitching(false), 100);
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setMagnetOffset({ x: 0, y: 0 });
    setIsGlitching(false);
  };

  useEffect(() => {
    return () => {
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-[3/4] transform transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-10"
          style={{
            backgroundImage: `linear-gradient(135deg, ${artifact.color_theme}, transparent)`,
            transform: `translate(${magnetOffset.x}px, ${magnetOffset.y}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        {imageError ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="text-center space-y-3">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-600" />
              <p className="text-gray-500 text-sm">Изображение недоступно</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={artifact.image_url}
              alt={artifact.title}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                isGlitching ? 'glitch-effect' : ''
              }`}
              onError={() => setImageError(true)}
              style={{
                transform: isGlitching
                  ? `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`
                  : 'none',
              }}
            />
            {isGlitching && (
              <>
                <img
                  src={artifact.image_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
                  style={{
                    transform: `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`,
                    filter: 'hue-rotate(90deg)',
                  }}
                />
                <img
                  src={artifact.image_url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
                  style={{
                    transform: `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px)`,
                    filter: 'hue-rotate(-90deg)',
                  }}
                />
              </>
            )}
          </div>
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${artifact.color_theme}20 0%, ${artifact.color_theme}60 100%)`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {artifact.title}
            </h3>
            <p className="text-sm text-gray-300 font-medium">
              {artifact.artist} • {artifact.year}
            </p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              {artifact.category}
            </p>
          </div>
        </div>

        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full shadow-lg"
          style={{ backgroundColor: artifact.color_theme }}
        />
      </div>

      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${artifact.color_theme}40, ${artifact.color_theme}20)`,
        }}
      />
    </div>
  );
}
