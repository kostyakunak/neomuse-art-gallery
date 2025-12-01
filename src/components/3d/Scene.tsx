import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
    children: React.ReactNode;
    className?: string;
}

export default function Scene({ children, className = '' }: SceneProps) {
    return (
        <div className={`w-full h-full min-h-[500px] ${className}`}>
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <Environment preset="city" />
                    {children}
                    <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
            </Canvas>
        </div>
    );
}
