import { ReactNode, useMemo } from "react";
import { Triplet } from "utils/types";

import { GroupProps,  } from "@react-three/fiber";

type BinProps = GroupProps & {
  boxWallThickness?: number;
  basePosition?: number;
  baseSize?: number;
  boxHeight?: number;
  falseBasePosition?: number;
  children: ReactNode;
  onClick?: () => void;
};

export const Bin = ({
  boxWallThickness = 0.003,
  basePosition = 0.01,
  baseSize = 0.09,
  boxHeight = 0.15,
  falseBasePosition,
  children,
  onClick,
  ...props
}: BinProps) => {
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



  return (
    <group onClick={onClick} {...props}>
      {shapes.map(({ type, args, ...shapeProps }, index) => (
        <mesh key={index} {...shapeProps} >
          <boxGeometry args={args} />
          {children}
        </mesh>
      ))}
    </group>
  );
};

export default Bin;
