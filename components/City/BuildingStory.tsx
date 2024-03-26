import { memo, useMemo } from "react";

import { GroupProps } from "@react-three/fiber";

import { VectorProp } from "../../consts";

export type BuildingStoryProps = GroupProps & {
  wallWindowMatrix: [number, number, number];
  wallMaterial?: JSX.Element;
  windowMaterial?: JSX.Element;
  windowInset?: number;
  windowStrutCount?: number;
  wallColor?: number;
  windowStrutMatrix?: [number, number];
};

const BuildingStory = ({
  wallWindowMatrix,
  wallColor = 0x444444,
  wallMaterial = (
    <meshStandardMaterial color={wallColor} roughness={1} metalness={0} />
  ),
  windowMaterial,
  windowInset = 0.02,
  windowStrutCount = 3,
  windowStrutMatrix = [9, 1],
  ...groupProps
}: BuildingStoryProps) => {
  const [lowerWallRatio, windowRatio, upperWallRatio] = wallWindowMatrix;
  const totalHeight = lowerWallRatio + windowRatio + upperWallRatio;
  const [lowerWallHeight, windowHeight, upperWallHeight] = wallWindowMatrix.map(
    (height) => height / totalHeight
  );

  // @ts-ignore
  // const [cubeMap] = useLoader(CubeTextureLoader, [
  //   // @ts-ignore
  //   [
  //     getStaticAsset("/maps/city/px.jpg"),
  //     getStaticAsset("/maps/city/nx.jpg"),
  //     getStaticAsset("/maps/city/py.jpg"),
  //     getStaticAsset("/maps/city/ny.jpg"),
  //     getStaticAsset("/maps/city/pz.jpg"),
  //     getStaticAsset("/maps/city/nz.jpg"),
  //   ],
  // ]);

  const windowStrutProps = useMemo(() => {
    const [windowRatio, strutRatio] = windowStrutMatrix;
    const totalWindowRatio = strutRatio + windowRatio;
    const windowsRatio = totalWindowRatio * windowStrutCount;

    const singleStrutWidth = strutRatio / windowsRatio;

    const start = -(0.5 - singleStrutWidth / 2);
    const end = 0.5 - singleStrutWidth / 2;

    const positions: number[] = [];
    for (let x = 1; x <= windowStrutCount; x++) {
      positions.push(start + (end - start) * (1 / (windowStrutCount / x)));
    }

    const scale: VectorProp = [
      singleStrutWidth,
      windowHeight,
      singleStrutWidth,
    ];

    const yPos = lowerWallHeight + windowHeight / 2;

    const struts1 = positions.map((z) => ({
      scale,
      position: [start, yPos, -z] as VectorProp,
    }));

    const struts2 = positions.map((z) => ({
      scale,
      position: [end, yPos, z] as VectorProp,
    }));

    const struts3 = positions.map((x) => ({
      scale,
      position: [x, yPos, start] as VectorProp,
    }));

    const struts4 = positions.map((x) => ({
      scale,
      position: [-x, yPos, end] as VectorProp,
    }));

    const strutProps: { scale: VectorProp; position: VectorProp }[] = [
      ...struts1,
      ...struts2,
      ...struts3,
      ...struts4,
    ];

    return strutProps;
  }, [lowerWallHeight, windowHeight, windowStrutCount, windowStrutMatrix]);

  return (
    <group {...groupProps}>
      {/* Upper wall */}
      <mesh
        scale={[1, upperWallHeight, 1]}
        position={[0, lowerWallHeight + windowHeight + upperWallHeight / 2, 0]}
      >
        <boxGeometry />
        {wallMaterial}
      </mesh>

      {windowStrutProps.map((props, index) => (
        <mesh key={index} {...props}>
          <boxGeometry />
          {wallMaterial}
        </mesh>
      ))}

      {/* Window */}
      <mesh
        scale={[1 - windowInset, windowHeight, 1 - windowInset]}
        position={[0, lowerWallHeight + windowHeight / 2, 0]}
      >
        <boxGeometry />
        {windowMaterial || (
          <meshStandardMaterial
            roughness={0}
            emissive="lightyellow"
            emissiveIntensity={0.2}
            metalness={1}
            transparent={true}
            opacity={0.7}
            // envMap={cubeMap}
            // envMapIntensity={1}
          />
        )}
      </mesh>

      {/* Lower wall */}
      <mesh
        scale={[1, lowerWallHeight, 1]}
        position={[0, lowerWallHeight / 2, 0]}
      >
        <boxGeometry />
        {wallMaterial}
      </mesh>
    </group>
  );
};

export default memo(BuildingStory);
