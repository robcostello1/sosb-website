import {
  CylinderProps,
  Triplet,
  useCylinder,
  usePlane,
  useBox,
  PlaneProps,
  CompoundBodyProps,
  useCompoundBody,
} from "@react-three/cannon";
import { Text3D } from "@react-three/drei";
import { Color, MeshProps } from "@react-three/fiber";
import { PropsWithChildren, ReactNode, useMemo, useRef, memo } from "react";
import { Mesh, BufferGeometry, Group } from "three";
import { useSocialShapeSetup } from "./useSocialShapeSetup";

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

type SocialProps = CylinderProps & {
  font: any;
  scale: Triplet;
  color: Color;
  active: boolean;
  onClick?: () => void;
};

export const SocialMaterial = ({ color }: { color: Color }) => (
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

export const Social = ({
  font,
  scale,
  children,
  color,
  onClick,
  active,
  ...props
}: PropsWithChildren<SocialProps>) => {
  const [ref, api] = useCylinder<Mesh<BufferGeometry>>(() => ({
    args: [scale[0], scale[1], scale[2] * 0.35, 12],
    ...SOCIAL_PHYSICS_PROPS,
    ...props,
  }));

  const { handlePointerEnter, handlePointerLeave } = useSocialShapeSetup(
    ref,
    api,
    scale,
    active
  );

  return (
    // @ts-ignore
    <Text3D
      ref={ref}
      font={font}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...SOCIAL_TYPE_PROPS}
      {...props}
    >
      {children}
      <SocialMaterial color={color} />
    </Text3D>
  );
};

export const SquareSocial = ({
  font,
  scale = [1, 1, 1],
  children,
  color,
  onClick,
  active,
  ...props
}: PropsWithChildren<SocialProps>) => {
  const [ref, api] = useBox<Mesh<BufferGeometry>>(() => ({
    // @ts-ignore
    args: [scale[0] * 1.6, scale[1] * 0.35, scale[2] * 1.6],
    ...SOCIAL_PHYSICS_PROPS,
    ...props,
  }));

  const { handlePointerEnter, handlePointerLeave } = useSocialShapeSetup(
    ref,
    api,
    scale,
    active
  );

  return (
    // @ts-ignore
    <Text3D
      ref={ref}
      font={font}
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...SOCIAL_TYPE_PROPS}
      {...props}
    >
      {children}
      <SocialMaterial color={color} />
    </Text3D>
  );
};

export const Plane = (props: PlaneProps) => {
  usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return <></>;
};

type ContainerProps = Omit<CompoundBodyProps, "args" | "shapes"> & {
  boxWallThickness?: number;
  basePosition?: number;
  baseSize?: number;
  boxHeight?: number;
  falseBasePosition?: number;
  color?: Color;
  children: ReactNode;
  onClick?: () => void;
};

export const Container = ({
  boxWallThickness = 0.003,
  basePosition = 0.01,
  baseSize = 0.09,
  boxHeight = 0.15,
  falseBasePosition,
  children,
  onClick,
  ...props
}: ContainerProps) => {
  const boxWallArgs = useMemo<Triplet>(
    () => [baseSize, boxHeight, boxWallThickness],
    [baseSize, boxHeight, boxWallThickness]
  );

  const yPos = boxWallArgs[1] / 2 + basePosition;

  const shapes = useMemo(() => {
    const faces: CompoundBodyProps["shapes"] = [
      {
        // @ts-ignore
        args: boxWallArgs,
        position: [0, yPos, -boxWallArgs[0] / 2],
        rotation: [0, 0, 0],
        type: "Box",
      },
      {
        // @ts-ignore
        args: boxWallArgs,
        position: [-boxWallArgs[0] / 2, yPos, 0],
        rotation: [0, Math.PI / 2, 0],
        type: "Box",
      },
      {
        // @ts-ignore
        args: boxWallArgs,
        position: [0, yPos, boxWallArgs[0] / 2],
        rotation: [0, 0, 0],
        type: "Box",
      },
      {
        // @ts-ignore
        args: boxWallArgs,
        position: [boxWallArgs[0] / 2, yPos, 0],
        rotation: [0, Math.PI / 2, 0],
        type: "Box",
      },
      {
        // @ts-ignore
        args: [baseSize, boxWallThickness, baseSize],
        position: [0, basePosition, 0],
        rotation: [0, 0, 0],
        type: "Box",
      },
    ];

    if (falseBasePosition) {
      faces.push({
        // @ts-ignore
        args: [baseSize, boxWallThickness, baseSize],
        position: [0, falseBasePosition, 0],
        rotation: [0, 0, 0],
        type: "Box",
      });
    }
    return faces;
  }, []);

  const [ref, api] = useCompoundBody(
    () => ({
      mass: 1,
      friction: 0,
      shapes,
      ...SLEEP_PROPS,
      ...props,
    }),
    useRef<Group>(null)
  );

  return (
    <group ref={ref} onClick={onClick}>
      {shapes.map(
        (
          {
            type,
            // @ts-ignore
            args,
            ...shapeProps
          },
          index
        ) => (
          <mesh
            key={index}
            {...(shapeProps as MeshProps)}
            onClick={() => {
              api.applyImpulse([-0.4, 0, 0], [0, boxHeight, 0]);
            }}
          >
            <boxGeometry args={args} />
            {children}
          </mesh>
        )
      )}
    </group>
  );
};
