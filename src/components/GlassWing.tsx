import { useState } from 'react';
import LatentCrystal from './LatentCrystal';
import UIFossil from './UIFossil';
import GlassRefraction from './GlassRefraction';

const crystalExhibits = [
  {
    id: 'crystal-1',
    title: 'Neon Corridor',
    subtitle: 'Latent Variations',
    variations: [
      {
        name: 'Realistic',
        imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 0,
      },
      {
        name: 'Stylized',
        imageUrl: 'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 33,
      },
      {
        name: 'Noisy',
        imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 66,
      },
      {
        name: 'Abstract',
        imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 100,
      },
    ],
    color: '#8b5cf6',
  },
  {
    id: 'crystal-2',
    title: 'Desert Mirage',
    subtitle: 'Style Transfer Spectrum',
    variations: [
      {
        name: 'Photographic',
        imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 0,
      },
      {
        name: 'Painterly',
        imageUrl: 'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 33,
      },
      {
        name: 'Glitch',
        imageUrl: 'https://images.pexels.com/photos/1154510/pexels-photo-1154510.jpeg?auto=compress&cs=tinysrgb&w=800',
        position: 66,
      },
      {
        name: 'Surreal',
        imageUrl: 'https://www.singulart.com/images-sh/eyJidWNrZXQiOiJzaW5ndWxhcnQtd2Vic2l0ZS1wcm9kIiwia2V5IjoiYXJ0d29ya3NcL3YyXC9jcm9wcGVkXC82OTEzMlwvbWFpblwvem9vbVwvMjMxMTU0Ml85N2NkNjEzN2MxMmFkZjQxZmU3MzMyZmE3ZWEwNzE3Ny5qcGVnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoyMjcwLCJoZWlnaHQiOjE3MDAsImZpdCI6Imluc2lkZSIsImJhY2tncm91bmQiOm51bGx9LCJ0b0Zvcm1hdCI6IndlYnAifX0=?signature=55928d4c9016c2df945a156146b15887a924fda6a6c0e8584eec909a6160a79d',
        position: 100,
      },
    ],
    color: '#f59e0b',
  },
];

const fossilExhibits = [
  {
    id: 'fossil-1',
    era: '1995',
    title: 'Windows 95 · Error Relic',
    description: 'The iconic error dialog that defined a generation of computing frustration.',
    imageUrl: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=600',
    accentColor: '#3b82f6',
  },
  {
    id: 'fossil-2',
    era: '2007',
    title: 'Skeuomorphic iOS · Memory',
    description: 'When digital interfaces mimicked physical materials and textures.',
    imageUrl: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600',
    accentColor: '#10b981',
  },
  {
    id: 'fossil-3',
    era: '2000',
    title: 'Web 1.0 · Homepage',
    description: 'Before CSS, when tables ruled layout and backgrounds had stars.',
    imageUrl: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=600',
    accentColor: '#ec4899',
  },
  {
    id: 'fossil-4',
    era: '2010',
    title: 'Flash Player · Animation',
    description: 'Interactive experiences that once dominated the web, now frozen in time.',
    imageUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600',
    accentColor: '#8b5cf6',
  },
  {
    id: 'fossil-5',
    era: '1998',
    title: 'Clippy · Assistant',
    description: 'The well-meaning but intrusive helper that became a cultural icon.',
    imageUrl: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600',
    accentColor: '#f59e0b',
  },
  {
    id: 'fossil-6',
    era: '2012',
    title: 'Metro UI · Tiles',
    description: 'Bold, flat design language that signaled the end of skeuomorphism.',
    imageUrl: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
    accentColor: '#06b6d4',
  },
];

export default function GlassWing() {
  const [activeStation, setActiveStation] = useState<'crystals' | 'fossils'>('crystals');

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const scrollHeight = e.currentTarget.scrollHeight;
    const clientHeight = e.currentTarget.clientHeight;

    const scrollPercent = scrollTop / (scrollHeight - clientHeight);

    if (scrollPercent < 0.4) {
      setActiveStation('crystals');
    } else {
      setActiveStation('fossils');
    }
  };

  const scrollToSection = (section: 'crystals' | 'fossils') => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 text-gray-900 relative overflow-hidden">
      <GlassRefraction />

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden lg:block w-80 sticky top-0 h-screen border-r border-gray-200/50 bg-white/40 backdrop-blur-xl p-12">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Glass Wing</h1>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Digital Wing II</p>
            </div>

            <div className="h-px bg-gradient-to-r from-gray-300 to-transparent" />

            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Latent space and frozen interfaces.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Curated experiments with AI-generated variations and archived UI fragments from computing history.
              </p>
            </div>

            <nav className="space-y-3 pt-4">
              <button
                onClick={() => scrollToSection('crystals')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeStation === 'crystals'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xs font-mono text-gray-400">01</span>
                <span className="ml-3 font-medium">Latent Crystals</span>
              </button>
              <button
                onClick={() => scrollToSection('fossils')}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeStation === 'fossils'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xs font-mono text-gray-400">02</span>
                <span className="ml-3 font-medium">UI Fossils</span>
              </button>
            </nav>

            <div className="pt-8 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs text-gray-500 uppercase tracking-wider">NeoMuse Collection</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto" onScroll={handleScroll}>
          <div className="max-w-5xl mx-auto px-8 py-20 space-y-32">
            <section id="crystals" className="scroll-mt-20 space-y-24">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Latent Space Crystals</h2>
                <p className="text-gray-600 max-w-2xl">
                  Each crystal contains multiple variations of the same concept, generated by exploring
                  different regions of AI latent space. Move your cursor to rotate through possibilities.
                </p>
              </div>

              {crystalExhibits.map((exhibit) => (
                <LatentCrystal key={exhibit.id} {...exhibit} />
              ))}
            </section>

            <section id="fossils" className="scroll-mt-20 space-y-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">UI Fossils</h2>
                <p className="text-gray-600 max-w-2xl">
                  Fragments of digital interfaces preserved in glass. These relics from computing history
                  briefly reanimate on interaction, offering glimpses of past design paradigms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fossilExhibits.map((fossil) => (
                  <UIFossil key={fossil.id} {...fossil} />
                ))}
              </div>
            </section>

            <div className="h-32" />
          </div>
        </main>
      </div>
    </div>
  );
}
