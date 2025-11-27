import { useEffect, useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { Artifact } from '../lib/supabase';

interface ArtifactModalProps {
  artifact: Artifact;
  onClose: () => void;
}

export default function ArtifactModal({ artifact, onClose }: ArtifactModalProps) {
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Сброс ошибки при изменении изображения
  useEffect(() => {
    setImageError(false);
  }, [artifact.image_url]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="liquid-morph absolute w-96 h-96 opacity-10 blur-3xl"
          style={{
            background: artifact.color_theme,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease, top 0.3s ease',
          }}
        />
      </div>

      <div
        className="relative max-w-6xl w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 0 100px ${artifact.color_theme}40`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            {!imageError ? (
              <>
                <img
                  src={artifact.image_url}
                  alt={artifact.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${artifact.color_theme}40 0%, transparent 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${artifact.color_theme}20 0%, transparent 60%)`,
                    transition: 'background 0.2s ease',
                  }}
                />
              </>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <div className="text-center space-y-3">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-600" />
                  <p className="text-gray-500 text-sm">Image unavailable</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6 text-white py-4">
            <div className="space-y-2 float-animation">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider liquid-morph"
                style={{
                  backgroundColor: `${artifact.color_theme}30`,
                  color: artifact.color_theme,
                  boxShadow: `0 0 20px ${artifact.color_theme}40`,
                }}
              >
                {artifact.category}
              </div>
              <h2 className="text-5xl font-bold tracking-tight">
                {artifact.title}
              </h2>
            </div>

            <div className="space-y-1">
              <p className="text-xl text-gray-300 font-medium">
                {artifact.artist}
              </p>
              <p className="text-lg text-gray-400">
                {artifact.year}
              </p>
            </div>

            <div
              className="h-1 w-24 rounded-full"
              style={{ backgroundColor: artifact.color_theme }}
            />

            <p className="text-lg text-gray-300 leading-relaxed">
              {artifact.description}
            </p>

            <div className="pt-4 flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: artifact.color_theme }}
              />
              <span className="text-sm text-gray-400 uppercase tracking-wider">
                NeoMuse Collection
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
