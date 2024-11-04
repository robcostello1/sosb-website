import { Box, Text3D } from '@react-three/drei';
import { GroupProps, useLoader } from '@react-three/fiber';
import { SocialMaterial } from 'components/Socials/Social';
import { useEffect, useRef, useState } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Triplet } from 'utils/types';
import { getStaticAsset } from 'utils/utils';

const SCALE = 1.3;

type FerrisWheelProps = Omit<GroupProps, 'scale'> & {
    scale?: Triplet
}

const FerrisWheel = ({ scale = [1, 1, 1], ...props }: FerrisWheelProps) => {
    const ferris = useLoader(GLTFLoader, getStaticAsset("/ferris.glb"));
    const eye = useLoader(GLTFLoader, getStaticAsset("/models/eye.glb"));
    const [active, setActive] = useState(false);
    const eyeRef = useRef<{
        children: {
            children: { material: { emissiveIntensity: number, needsUpdate: boolean } }[]
        }[]
    }>()

    const { data: font } = useLoader(
        FontLoader,
        "/fonts/Hollywood Hills_Regular.json"
    );


    useEffect(() => {
        if (eyeRef.current) {
            eyeRef.current.children[0].children.forEach((child) => {
                child.material.emissiveIntensity = active ? 1 : 0;
                child.material.needsUpdate = true;
            });
        }
    }, [eyeRef, active])

    return (
        <group
            scale={[scale[0] * SCALE, scale[1] * SCALE, scale[2] * SCALE]}
            onClick={() => {
                setActive(!active)
                // window.open("https://www.youtube.com/watch?v=PcBFhMXr5_A");
            }}
            {...props}
        >
            <group
                onClick={() => {
                    if (active) {
                        window.open("https://www.youtube.com/watch?v=PcBFhMXr5_A");
                    }
                }}
                scale={[0.9, 0.9, 0.9]}
                position={[0.2, -0.2, -0.4]}
                rotation={[0, 0.4, 0]}
            >
                <Text3D scale={[0.201, 0.201, 0.4]} position={[0, 0, 0]} font={font}>
                    Neon
                    <SocialMaterial color="red" emissiveIntensity={active ? 1 : 0} />
                </Text3D>
                <Text3D scale={[0.1, 0.1, 0.4]} position={[0, -0.116, 0]} font={font}>
                    Contrails
                    <SocialMaterial color="turquoise" emissiveIntensity={active ? 0.6 : 0} />
                </Text3D>
                <group position={[0.31, -0.26, 0]} scale={[0.084, 0.084, 0.021]} rotation={[0, 0, 0]}>
                    <primitive ref={eyeRef} object={eye.scene} />
                </group>
                <Box scale={[0.6, 0.54, 0.1]} position={[0.33, -0.08, 0]}><meshBasicMaterial transparent opacity={0} /></Box>
            </group>
            <primitive object={ferris.scene} />
        </group >
    )
}

export default FerrisWheel
