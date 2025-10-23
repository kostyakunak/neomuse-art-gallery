import { useState, useEffect } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { supabase, Artifact } from './lib/supabase';
import ArtifactCard from './components/ArtifactCard';
import ArtifactModal from './components/ArtifactModal';

function App() {
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
    const { data, error } = await supabase
      .from('artifacts')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching artifacts:', error);
    } else {
      setArtifacts(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
      />

      <div className="relative z-10">
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Sparkles className="w-10 h-10 text-blue-500 animate-pulse" />
                  <div className="absolute inset-0 blur-xl bg-blue-500 opacity-50 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">
                    NeoMuse
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Interactive 3D Art Gallery Experience
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-5 h-5" />
                <span className="text-sm">{artifacts.length} Artifacts</span>
              </div>
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
                  Hover over each piece to experience interactive 3D effects, click to view details.
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
