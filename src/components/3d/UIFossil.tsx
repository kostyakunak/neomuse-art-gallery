import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { Text, Float, MeshTransmissionMaterial } from '@react-three/drei';

interface UIFossilProps {
    position?: [number, number, number];
    label?: string;
    year?: string;
}

export default function UIFossil({ position = [0, 0, 0], label = 'Interface', year = '1995' }: UIFossilProps) {
    const groupRef = useRef<Group>(null);
    const contentRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [animating, setAnimating] = useState(false);

    // Animation state
    const [glitchIntensity, setGlitchIntensity] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (hovered) {
            setAnimating(true);
            // Brief animation sequence
            setGlitchIntensity(1);

            // Fade out animation after 800ms even if still hovered
            timeout = setTimeout(() => {
                setAnimating(false);
                setGlitchIntensity(0);
            }, 800);
        } else {
            setAnimating(false);
            setGlitchIntensity(0);
        }
        return () => clearTimeout(timeout);
    }, [hovered]);

    useFrame((state) => {
        if (contentRef.current && animating) {
            // Glitch/Alive effect
            const time = state.clock.getElapsedTime();
            contentRef.current.position.x = (Math.sin(time * 20) * 0.05 * glitchIntensity);
            contentRef.current.position.y = (Math.cos(time * 15) * 0.05 * glitchIntensity);
            contentRef.current.scale.setScalar(1 + Math.sin(time * 10) * 0.02 * glitchIntensity);
        } else if (contentRef.current) {
            // Reset to frozen state
            contentRef.current.position.x = 0;
            contentRef.current.position.y = 0;
            contentRef.current.scale.setScalar(1);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef} position={position}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Glass Slab */}
                <mesh>
                    <boxGeometry args={[4, 3, 0.5]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={2} // Reduced from 4
                        resolution={512} // Reduced resolution
                        thickness={0.5}
                        chromaticAberration={0.5}
                        anisotropy={0.3}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.1}
                        iridescence={1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[0, 1400]}
                        roughness={0.1}
                        clearcoat={1}
                        attenuationDistance={0.5}
                        attenuationColor="#ffffff"
                        color="#eef2ff"
                        background={undefined}
                    />
                </mesh>

                {/* Inner Content (Frozen Interface) */}
                <group scale={[0.9, 0.9, 0.9]} position={[0, 0, 0]}>
                    <mesh ref={contentRef}>
                        <planeGeometry args={[3.6, 2.6]} />
                        <meshBasicMaterial
                            color={animating ? "#ffffff" : "#cccccc"}
                            wireframe={!animating}
                            transparent
                            opacity={animating ? 0.9 : 0.4}
                        />
                        {/* Placeholder UI Elements */}
                        <group position={[0, 0, 0.01]}>
                            {/* Header */}
                            <mesh position={[0, 1.1, 0]}>
                                <planeGeometry args={[3.4, 0.3]} />
                                <meshBasicMaterial color={animating ? "#3b82f6" : "#94a3b8"} />
                            </mesh>
                            {/* Content blocks */}
                            <mesh position={[-0.8, 0, 0]}>
                                <planeGeometry args={[1.5, 1.5]} />
                                <meshBasicMaterial color={animating ? "#e2e8f0" : "#cbd5e1"} wireframe />
                            </mesh>
                            <mesh position={[0.8, 0.4, 0]}>
                                <planeGeometry args={[1.5, 0.7]} />
                                <meshBasicMaterial color={animating ? "#e2e8f0" : "#cbd5e1"} wireframe />
                            </mesh>
                            <mesh position={[0.8, -0.4, 0]}>
                                <planeGeometry args={[1.5, 0.7]} />
                                <meshBasicMaterial color={animating ? "#e2e8f0" : "#cbd5e1"} wireframe />
                            </mesh>
                        </group>
                    </mesh>
                </group>

                {/* Cracks/Imperfections (Subtle lines) */}
                <mesh position={[1, 1, 0.26]} rotation={[0, 0, 0.5]}>
                    <planeGeometry args={[0.5, 0.02]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.3} transparent />
                </mesh>
                <mesh position={[-1.2, -0.8, 0.26]} rotation={[0, 0, -0.2]}>
                    <planeGeometry args={[0.8, 0.02]} />
                    <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
                </mesh>

                {/* Label Floating Outside */}
                <Text
                    position={[0, -2, 0]}
                    fontSize={0.15}
                    color="#1f2937"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
                <Text
                    position={[0, -2.25, 0]}
                    fontSize={0.1}
                    color="#6b7280"
                    anchorX="center"
                    anchorY="middle"
                >
                    {year}
                </Text>
            </group>
        </Float>
    );
}
