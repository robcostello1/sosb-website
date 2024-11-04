import { Box, Text3D } from "@react-three/drei"
import { useLoader } from "@react-three/fiber";
import { SocialMaterial } from "components/Socials/Social"
import { useEffect, useRef } from "react"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { getStaticAsset } from "utils/utils";

const GarageSign = (
    { active }: { active: boolean }
) => {
    const arrow = useLoader(GLTFLoader, getStaticAsset("/models/arrow.glb"));

    const { data: font } = useLoader(
        FontLoader,
        "/fonts/Hollywood Hills_Regular.json"
    );

    const arrorRef = useRef<{
        children: {
            children: { material: { emissiveIntensity: number, needsUpdate: boolean } }[]
        }[]
    }>()

    useEffect(() => {
        if (arrorRef.current) {
            arrorRef.current.children[0].children.forEach((child) => {
                child.material.emissiveIntensity = active ? 1 : 0;
                child.material.needsUpdate = true;
            });
        }
    }, [arrorRef, active])

    return (
        <group
            scale={[0.13, 0.13, 0.13]}
            position={[-0.48, 0.39, 0.79]}
            rotation={[0, Math.PI / 8, 0]}
        >
            <Text3D scale={[0.201, 0.201, 0.4]} position={[0, 0, 0]} font={font}>
                Afloat
                <SocialMaterial color="red" emissiveIntensity={active ? 1 : 0} />
            </Text3D>
            <group position={[0.31, -0.26, 0.04]} scale={[0.084, 0.084, 0.021]} rotation={[0, 0, 0.3]}>
                <primitive ref={arrorRef} object={arrow.scene} />
            </group>
            <Box args={[1.2, 0.6, 0.1]} position={[0.41, 0, 0]} ><meshStandardMaterial color="black" /></Box>
        </group>
    )
}

export default GarageSign