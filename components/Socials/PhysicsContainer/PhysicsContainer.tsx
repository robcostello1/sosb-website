import { ReactNode, useMemo, useRef } from 'react';
import { Group, Vector3 } from 'three';

import { BoxGeometryProps, Color, MeshProps } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';

import { Triplet } from '../../../utils/types';

const SLEEP_PROPS = {
  allowSleep: true,
  sleepTimeLimit: 1,
  sleepSpeedLimit: 1,
};

type PhysicsContainerProps = MeshProps & {
  boxWallThickness?: number;
  basePosition?: number;
  baseSize?: number;
  boxHeight?: number;
  falseBasePosition?: number;
  color?: Color;
  children: ReactNode;
  onClick?: () => void;
};

export const PhysicsContainer = ({
  boxWallThickness = 0.003,
  basePosition = 0.01,
  baseSize = 0.09,
  boxHeight = 0.15,
  falseBasePosition,
  children,
  onClick,
  ...props
}: PhysicsContainerProps) => {
  const boxWallArgs = useMemo<Triplet>(
    () => [baseSize, boxHeight, boxWallThickness],
    [baseSize, boxHeight, boxWallThickness]
  );

  const yPos = boxWallArgs[1] / 2 + basePosition;

  const shapes = useMemo(() => {
    const faces: {
      args: Triplet;
      position: Triplet;
      rotation: Triplet;
      // TODO unnecessary
      type: "Box";
    }[] = [
      {
        args: boxWallArgs,
        position: [0, yPos, -boxWallArgs[0] / 2],
        rotation: [0, 0, 0],
        type: "Box",
      },
      {
        args: boxWallArgs,
        position: [-boxWallArgs[0] / 2, yPos, 0],
        rotation: [0, Math.PI / 2, 0],
        type: "Box",
      },
      {
        args: boxWallArgs,
        position: [0, yPos, boxWallArgs[0] / 2],
        rotation: [0, 0, 0],
        type: "Box",
      },
      {
        args: boxWallArgs,
        position: [boxWallArgs[0] / 2, yPos, 0],
        rotation: [0, Math.PI / 2, 0],
        type: "Box",
      },
      {
        args: [baseSize, boxWallThickness, baseSize],
        position: [0, basePosition, 0],
        rotation: [0, 0, 0],
        type: "Box",
      },
    ];

    if (falseBasePosition) {
      faces.push({
        args: [baseSize, boxWallThickness, baseSize],
        position: [0, falseBasePosition, 0],
        rotation: [0, 0, 0],
        type: "Box",
      });
    }
    return faces;
  }, [
    basePosition,
    baseSize,
    boxWallArgs,
    boxWallThickness,
    falseBasePosition,
    yPos,
  ]);

  const ref = useRef<RapierRigidBody>(null);

  return (
    <group onClick={onClick}>
      <RigidBody mass={2} ref={ref}>
        {shapes.map(({ type, args, ...shapeProps }, index) => (
          <mesh
            key={index}
            {...shapeProps}
            onClick={() => {
              ref.current?.applyImpulseAtPoint(
                new Vector3(-0.00005, 0, 0),
                new Vector3(0, boxHeight, 0),
                true
              );
            }}
          >
            <boxGeometry args={args} />
            {children}
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
};

export default PhysicsContainer;
