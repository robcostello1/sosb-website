import { Box, Cylinder, Text3D } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { forwardRef, useState, memo } from "react";
import { Mesh } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Triplet } from "../utils/types";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  position?: Triplet;
  rotation?: Triplet;
  scale?: Triplet;
  castShadow?: boolean;
  buttonName?: string;
  onClick?: () => void;
};

const Button = forwardRef<Mesh, ButtonProps>(
  (
    {
      disabled,
      text,
      castShadow,
      scale = [0.2, 0.2, 0.2],
      rotation = [Math.PI / 2, 0, 0],
      position,
      buttonName,
      onClick,
    },
    ref
  ) => {
    const [active, setActive] = useState(false);
    const { data: font } = useLoader(
      FontLoader,
      "/fonts/Hollywood Hills_Regular.json"
    );
    return (
      <group
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerEnter={() => !disabled && setActive(true)}
        onPointerLeave={() => setActive(false)}
        onClick={onClick}
      >
        <Box
          castShadow={castShadow}
          scale={[0.3, 0.12, 0.4]}
          position={[0, -0.05, 0]}
        >
          <meshStandardMaterial color="grey" />
        </Box>
        <Cylinder args={[0.1, 0.1, 0.1, 16]} name={buttonName} ref={ref}>
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
          {text}
          <meshStandardMaterial color="black" />
        </Text3D>
      </group>
    );
  }
);

export default memo(Button);
