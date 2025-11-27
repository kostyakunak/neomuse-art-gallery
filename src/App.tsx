import { useState, useEffect } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { Artifact } from './lib/supabase';
import ArtifactCard from './components/ArtifactCard';
import ArtifactModal from './components/ArtifactModal';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import WaveText from './components/WaveText';
import MorphIcon from './components/MorphIcon';
import GlassWing from './components/GlassWing';
import artifactsData from './data/artifacts.json';

type Gallery = 'main' | 'glass';

function App() {
  const [activeGallery, setActiveGallery] = useState<Gallery>('main');
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchArtifacts();
  }, []);

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

  const fetchArtifacts = async () => {
    setLoading(true);
    try {
      // Load artifacts from static JSON file
      // Sort by display_order to maintain the same order as before
      const sortedArtifacts = [...artifactsData].sort(
        (a, b) => a.display_order - b.display_order
      );
      setArtifacts(sortedArtifacts);
    } catch (error) {
      console.error('Error loading artifacts:', error);
      setArtifacts([]);
    }
    setLoading(false);
  };

  if (activeGallery === 'glass') {
    return (
      <div className="min-h-screen transition-colors duration-700">
        <CustomCursor />

        <header className="border-b border-gray-200/50 bg-white/40 backdrop-blur-xl sticky top-0 z-40 transition-all duration-700">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MorphIcon Icon={Sparkles} color="#6366f1" size={40} />
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">NeoMuse</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Interactive 3D Art Gallery Experience
                  </p>
                </div>
              </div>
              <nav className="flex gap-2">
                <button
                  onClick={() => setActiveGallery('main')}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-600 hover:bg-gray-100"
                >
                  Main Gallery
                </button>
                <button
                  onClick={() => setActiveGallery('glass')}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-gray-900 text-white shadow-lg"
                >
                  Glass Wing
                </button>
              </nav>
            </div>
          </div>
        </header>

        <GlassWing />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden transition-colors duration-700">
      <CustomCursor />
      <ParticleBackground />

      <div
        className="fixed inset-0 opacity-30 pointer-events-none z-1"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 60%)`,
          transition: 'background 0.3s ease',
        }}
      />

      <div
        className="fixed inset-0 opacity-20 pointer-events-none z-1"
        style={{
          background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)`,
          transition: 'background 0.4s ease',
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-40 transition-all duration-700">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MorphIcon Icon={Sparkles} color="#3b82f6" size={40} />
                <div>
                  <WaveText text="NeoMuse" className="text-4xl font-bold tracking-tight" />
                  <p className="text-sm text-gray-400 mt-1">
                    Interactive 3D Art Gallery Experience
                  </p>
                </div>
              </div>
              <nav className="flex gap-2">
                <button
                  onClick={() => setActiveGallery('main')}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-white/10 text-white shadow-lg"
                >
                  Main Gallery
                </button>
                <button
                  onClick={() => setActiveGallery('glass')}
                  className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-gray-400 hover:bg-white/5"
                >
                  Glass Wing
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-16">
          {loading ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-400 text-lg">Loading gallery...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  Curated Collection
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Explore a handpicked selection of contemporary digital art and photography.
                  Click on the icon to view details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {artifacts.map((artifact, index) => (
                  <div
                    key={artifact.id}
                    className="animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <ArtifactCard
                      artifact={artifact}
                      onClick={() => setSelectedArtifact(artifact)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-xl mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-400">
            <p className="text-sm">
              NeoMuse © 2024 • Interactive Portfolio Showcase
            </p>
          </div>
        </footer>
      </div>

      {selectedArtifact && (
        <ArtifactModal
          artifact={selectedArtifact}
          onClose={() => setSelectedArtifact(null)}
        />
      )}
    </div>
  );
}

export default App;
