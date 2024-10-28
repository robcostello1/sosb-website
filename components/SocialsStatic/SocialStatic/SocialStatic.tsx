import { memo, PropsWithChildren, useState } from "react";

import { Text3D } from "@react-three/drei";
import { Color, GroupProps } from "@react-three/fiber";
import { DoubleSide } from "three";

// TODO: refacto
const SOCIAL_ICON_SIZE = 0.04;
const SOCIAL_ICON_SCALE: [number, number, number] = [
  SOCIAL_ICON_SIZE,
  SOCIAL_ICON_SIZE,
  SOCIAL_ICON_SIZE / 10,
];

const SOCIAL_TYPE_PROPS = {
  bevelEnabled: true,
  bevelSize: 0.015,
  bevelThickness: 0.01,
};

type SocialStaticProps = GroupProps & {
  font: any;
  color: Color;
  active?: boolean;
  onClick?: () => void;
};

export const SocialStaticMaterial = ({ color, intensity = 0.5 }: { color: Color, intensity?: number }) => (
  <>
    <meshStandardMaterial
      attach="material-0"
      roughness={1}
      color="#333333"
      emissive={color}
      emissiveIntensity={intensity}
      side={DoubleSide}
    />
    <meshStandardMaterial attach="material-1" roughness={0.5} color="#333333"
      side={DoubleSide} />
  </>
);

const FONT_SCALE = 1.45;

const SocialStatic = ({
  font,
  children,
  color,
  onClick,
  active = true,
  ...props
}: PropsWithChildren<SocialStaticProps>) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group {...props}>
      <Text3D
        font={font}
        onClick={onClick}
        scale={[SOCIAL_ICON_SCALE[0] * FONT_SCALE, SOCIAL_ICON_SCALE[1] * FONT_SCALE, SOCIAL_ICON_SCALE[2] * 10]}
        position={[
          (-SOCIAL_ICON_SCALE[0] / FONT_SCALE) * FONT_SCALE,
          (-SOCIAL_ICON_SCALE[1] / FONT_SCALE) * 1.1,
          -SOCIAL_ICON_SCALE[2],
        ]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        {...SOCIAL_TYPE_PROPS}
      >
        {children}
        <SocialStaticMaterial color={color} intensity={hovered ? 1 : 0.3} />
      </Text3D>
    </group>
  );
};

export default memo(SocialStatic)