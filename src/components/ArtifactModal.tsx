import { useEffect, useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { Artifact } from '../lib/supabase';

interface ArtifactModalProps {
  artifact: Artifact;
  onClose: () => void;
}

export default function ArtifactModal({ artifact, onClose }: ArtifactModalProps) {
  const [imageError, setImageError] = useState(false);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src={artifact.image_url}
              alt={artifact.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${artifact.color_theme}40 0%, transparent 100%)`,
              }}
            />
          </div>

          <div className="flex flex-col justify-center space-y-6 text-white py-4">
            <div className="space-y-2">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: `${artifact.color_theme}30`,
                  color: artifact.color_theme,
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
