import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Text, Float } from '@react-three/drei';

interface UIFossilProps {
    position?: [number, number, number];
    label?: string;
    year?: string;
}

export default function UIFossil({ position = [0, 0, 0], label = 'Interface', year = '1995' }: UIFossilProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current && hovered) {
            // Glitch effect on hover
            if (Math.random() > 0.9) {
                meshRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.1;
            } else {
                meshRef.current.position.x = position[0];
            }
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position}>
                {/* Glass Slab */}
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    <boxGeometry args={[4, 3, 0.4]} />
                    <meshPhysicalMaterial
                        color={hovered ? '#a5f3fc' : '#ffffff'}
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.9}
                        thickness={1}
                        clearcoat={1}
                    />
                </mesh>

                {/* Inner Content (Placeholder for texture) */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[3.6, 2.6]} />
                    <meshBasicMaterial color="#000" wireframe opacity={0.2} transparent />
                </mesh>

                {/* Label */}
                <Text
                    position={[0, -1.8, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label} • {year}
                </Text>
            </group>
        </Float>
    );
}
