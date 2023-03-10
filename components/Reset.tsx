import { Triplet } from "@react-three/cannon";
import { Box, Cylinder, Text3D } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const Reset = ({
  position,
  onClick,
}: {
  position: Triplet;
  onClick: () => void;
}) => {
  const [active, setActive] = useState(false);
  const { data: font } = useLoader(
    FontLoader,
    "/fonts/Hollywood Hills_Regular.json"
  );
  return (
    <group
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[0.2, 0.2, 0.2]}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onClick={onClick}
    >
      <Box scale={[0.3, 0.12, 0.4]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="grey" />
      </Box>
      <Cylinder args={[0.1, 0.1, 0.1, 16]}>
        <meshStandardMaterial
          color="red"
          emissive="red"
          emissiveIntensity={active ? 0.6 : 0.1}
        />
      </Cylinder>
      <Text3D
        font={font}
        scale={[0.04, 0.04, 0.08]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-0.08, 0.038, 0.02]}
      >
        Reset
        <meshStandardMaterial color="black" />
      </Text3D>
    </group>
  );
};

export default Reset;
