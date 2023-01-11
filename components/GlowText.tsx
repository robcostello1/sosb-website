import { Text3D } from "@react-three/drei";

import { Color } from "three";
import { RotationProp, VectorProp } from "../consts";

type GlowTextProps = {
  font: any;
  children: string;
  color: Color | string;
  position?: VectorProp;
  scale?: VectorProp;
  rotation?: RotationProp;
  emissiveIntensity?: number;
  on?: boolean;
  onClick?: () => void;
};

const GlowText = ({
  font,
  children,
  color,
  position = [0, 0, 0],
  scale = [0.28, 0.28, 0.28],
  rotation = [0, 0, 0],
  emissiveIntensity = 0.8,
  on = true,
  onClick,
}: GlowTextProps) => {
  return (
    <group position={position}>
      {/* <pointLight position={[0, 0, 0]} color={color} intensity={0.1} /> */}

      <Text3D
        font={font}
        scale={scale}
        rotation={rotation}
        castShadow
        onClick={onClick}
        bevelEnabled
        bevelSize={0.015}
        bevelThickness={0.01}
      >
        {children}
        <meshStandardMaterial
          attach="material-0"
          roughness={1}
          color="#333333"
          emissive={color}
          emissiveIntensity={on ? emissiveIntensity : 0}
        />
        <meshStandardMaterial
          attach="material-1"
          roughness={0.5}
          color="#333333"
        />
      </Text3D>
    </group>
  );
};

export default GlowText;
