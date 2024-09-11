import { memo, PropsWithChildren, useMemo } from "react";
import { Triplet } from "utils/types";

import { Text3D } from "@react-three/drei";
import { Color, MeshProps } from "@react-three/fiber";

const SOCIAL_TYPE_PROPS = {
  bevelEnabled: true,
  bevelSize: 0.015,
  bevelThickness: 0.01,
};

type SocialStaticProps = Omit<MeshProps, "scale"> & {
  font: any;
  scale: Triplet;
  color: Color;
  active?: boolean;
  onClick?: () => void;
};

export const SocialStaticMaterial = ({ color }: { color: Color }) => (
  <>
    <meshStandardMaterial
      attach="material-0"
      roughness={1}
      color="#333333"
      emissive={color}
    />
    <meshStandardMaterial attach="material-1" roughness={0.5} color="#333333" />
  </>
);

const fontScale = 1.45;

const SocialStatic = ({
  font,
  children,
  color,
  onClick,
  active = true,
  scale,
  position,
  rotation,
  ...props
}: PropsWithChildren<SocialStaticProps>) => {
  return (
      <Text3D
        font={font}
        onClick={onClick}
        scale={[scale[0] * fontScale, scale[1] * fontScale, scale[2] * 10]}
        position={[
          (-scale[0] / fontScale) * fontScale,
          (-scale[1] / fontScale) * 1.1,
          -scale[2],
        ]}
        {...SOCIAL_TYPE_PROPS}
        {...props}
      >
        {children}
        <SocialStaticMaterial color={color} />
      </Text3D>
  );
};

export default memo(SocialStatic)