import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Float } from '@react-three/drei';

interface LatentCrystalProps {
    position?: [number, number, number];
    color?: string;
}

export default function LatentCrystal({ position = [0, 0, 0], color = '#6366f1' }: LatentCrystalProps) {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((_, delta) => {
        if (meshRef.current) {
            // Base rotation
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;

            // Interaction speedup
            if (hovered) {
                meshRef.current.rotation.y += delta * 1;
            }
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={meshRef}
                position={position}
                scale={active ? 1.2 : 1}
                onClick={() => setActive(!active)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <icosahedronGeometry args={[2, 0]} />
                <meshPhysicalMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
}
