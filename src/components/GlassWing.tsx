import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { View, PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import GlassRefraction from './GlassRefraction';

import UIFossil from './3d/UIFossil';

export default function GlassWing() {

    const containerRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    // Refs for tracking elements

    const fossil1Ref = useRef<HTMLDivElement>(null);
    const fossil2Ref = useRef<HTMLDivElement>(null);
    const fossil3Ref = useRef<HTMLDivElement>(null);
    const fossil4Ref = useRef<HTMLDivElement>(null);



    const scrollToSection = (section: 'fossils') => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 text-gray-900 relative overflow-hidden">
            <GlassRefraction />

            {/* Shared Canvas Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas eventSource={mainRef} className="w-full h-full">
                    <Suspense fallback={null}>


                        <View track={fossil1Ref}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <Environment preset="city" />
                            <UIFossil position={[0, 0, 0]} label="Windows 95" year="1995" />
                            <OrbitControls enableZoom={false} enablePan={false} />
                        </View>
                        <View track={fossil2Ref}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <Environment preset="city" />
                            <UIFossil position={[0, 0, 0]} label="Skeuomorphic iOS" year="2007" />
                            <OrbitControls enableZoom={false} enablePan={false} />
                        </View>
                        <View track={fossil3Ref}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <Environment preset="city" />
                            <UIFossil position={[0, 0, 0]} label="Web 1.0" year="2000" />
                            <OrbitControls enableZoom={false} enablePan={false} />
                        </View>
                        <View track={fossil4Ref}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <Environment preset="city" />
                            <UIFossil position={[0, 0, 0]} label="Macintosh" year="1984" />
                            <OrbitControls enableZoom={false} enablePan={false} />
                        </View>
                    </Suspense>
                </Canvas>
            </div>

            <div className="relative z-10 flex min-h-screen pointer-events-none">
                <aside className="hidden lg:block w-80 sticky top-0 h-screen border-r border-gray-200/50 bg-white/40 backdrop-blur-xl p-12 pointer-events-auto">
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
                                onClick={() => scrollToSection('fossils')}
                                className="block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 bg-gray-900 text-white shadow-lg"
                            >
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

                <main ref={mainRef} className="flex-1 overflow-y-auto pointer-events-auto">
                    <div className="max-w-5xl mx-auto px-8 py-20 space-y-32">


                        <section id="fossils" className="scroll-mt-20 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">UI Fossils</h2>
                                <p className="text-gray-600 max-w-2xl">
                                    Fragments of digital history preserved in glass. Hover to reanimate these frozen interfaces.
                                </p>
                            </div>

                            {/* Grid layout - two fossils per row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div ref={fossil1Ref} className="w-full h-[45vh]" />
                                <div ref={fossil2Ref} className="w-full h-[45vh]" />
                                <div ref={fossil3Ref} className="w-full h-[45vh]" />
                                <div ref={fossil4Ref} className="w-full h-[45vh]" />
                            </div>
                        </section>

                        <div className="h-32" />
                    </div>
                </main>
            </div>
        </div>
    );
}
