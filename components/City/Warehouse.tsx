import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Color } from "three";
import { getRandomColor } from "utils/utils";

import BuildingStory from "./BuildingStory";
import Door from "./Door";

type WarehouseProps = {
  active: boolean;
  onClick: () => void;
  onClickInside: () => void;
};

const Warehouse = ({ active, onClick, onClickInside }: WarehouseProps) => {
  const [windowMaterialColor, setWindowMaterialColor] = useState<Color>(
    new Color(Math.random(), Math.random(), Math.random())
  );
  const [lightIntensity, setLightIntensity] = useState(Math.random());
  const interval = useRef<any>();

  useEffect(() => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setLightIntensity(Math.random());
      setWindowMaterialColor(getRandomColor());
    }, 500);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <>
      <Door
        windowMaterialColor={active && windowMaterialColor}
        emissiveIntensity={lightIntensity}
        rotation={[0, Math.PI, 0]}
        position={[-0.5, 0.01, 1]}
        open={active}
        onClickInside={onClickInside}
      />

      <BuildingStory
        onClick={() => {
          onClick();
          // window.open(
          //   "https://soundsofsystembreakdown.bandcamp.com/album/desperate-creatures"
          // );
        }}
        rotation={[0, Math.PI, 0]}
        position={[-1, 0, 1.2]}
        scale={[1, 0.55, 0.8]}
        wallWindowMatrix={[0.35, 0.1, 0.05]}
        wallMaterial={
          <meshStandardMaterial color={0x555555} roughness={1} metalness={0} />
        }
        windowMaterial={<meshStandardMaterial
          roughness={0}
          emissive={active ? windowMaterialColor : "black"}
          emissiveIntensity={lightIntensity / 2}
          metalness={1}
          transparent={true}
          opacity={0.7}
        />}
      />

      {/* Footpath */}
      <mesh
        rotation={[0, Math.PI, 0]}
        scale={[1.4, 0.02, 1.7]}
        position={[-1, 0.01, 1.5]}
      >
        <boxGeometry />
        <meshStandardMaterial color={0x444444} roughness={1} metalness={0} />
      </mesh>
    </>
  );
};

export default memo(Warehouse);
