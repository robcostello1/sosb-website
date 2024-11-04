import { PropsWithChildren, useState } from "react";
import { Triplet } from "utils/types";

import { Text3D } from "@react-three/drei";
import { Color, MeshProps } from "@react-three/fiber";
import { CylinderCollider, RigidBody } from "@react-three/rapier";

const SLEEP_PROPS = {
  allowSleep: true,
  sleepTimeLimit: 1,
  sleepSpeedLimit: 1,
};

const SOCIAL_TYPE_PROPS = {
  bevelEnabled: true,
  bevelSize: 0.015,
  bevelThickness: 0.01,
};
const SOCIAL_PHYSICS_PROPS = {
  ...SLEEP_PROPS,
  mass: 0.5,
};

type SocialProps = Omit<MeshProps, "scale"> & {
  font: any;
  scale: Triplet;
  color: Color;
  active: boolean;
  onClick?: () => void;
};

export const SocialMaterial = ({ color, emissiveIntensity = 1 }: { color: Color, emissiveIntensity?: number }) => (
  <>
    <meshStandardMaterial
      attach="material-0"
      roughness={1}
      color="#333333"
      emissive={color}
      emissiveIntensity={emissiveIntensity}
    />
    <meshStandardMaterial attach="material-1" roughness={0.5} color="#333333" />
  </>
);

const fontScale = 1.45;

export const Social = ({
  font,
  children,
  color,
  onClick,
  active,
  scale,
  position,
  rotation,
  ...props
}: PropsWithChildren<SocialProps>) => {
  return (
    <RigidBody
      mass={0.75}
      colliders={false}
      position={position}
      rotation={rotation}
    >
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        args={[scale[2], scale[0]]}
      />

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
        <SocialMaterial color={color} />
      </Text3D>
    </RigidBody>
  );
};

// export const SquareSocial = ({
//   font,
//   scale = [1, 1, 1],
//   children,
//   color,
//   onClick,
//   active,
//   ...props
// }: PropsWithChildren<SocialProps>) => {
//   const [ref, api] = useBox<Mesh<BufferGeometry>>(() => ({
//     // @ts-ignore
//     args: [scale[0] * 1.6, scale[1] * 0.35, scale[2] * 1.6],
//     ...SOCIAL_PHYSICS_PROPS,
//     ...props,
//   }));

//   const { handlePointerEnter, handlePointerLeave } = useSocialShapeSetup(
//     ref,
//     api,
//     scale,
//     active
//   );

//   return (
//     // @ts-ignore
//     <Text3D
//       ref={ref}
//       font={font}
//       onClick={onClick}
//       onPointerEnter={handlePointerEnter}
//       onPointerLeave={handlePointerLeave}
//       {...SOCIAL_TYPE_PROPS}
//       {...props}
//     >
//       {children}
//       <SocialMaterial color={color} />
//     </Text3D>
//   );
// };
