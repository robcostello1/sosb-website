import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, memo } from "react";
import { Color } from "three";

import BuildingStory from "./BuildingStory";

type WarehouseProps = {
  active: boolean;
  onClick: () => void;
};

const Warehouse = ({ active, onClick }: WarehouseProps) => {
  const [windowMaterialColor, setWindowMaterialColor] = useState<Color>(
    new Color(Math.random(), Math.random(), Math.random())
  );
  const interval = useRef<any>();

  useEffect(() => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setWindowMaterialColor(
        new Color(Math.random(), Math.random(), Math.random())
      );
    }, 500);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const windowMaterial = useMemo(
    () => (
      <meshStandardMaterial
        roughness={0}
        emissive={active ? windowMaterialColor : "black"}
        emissiveIntensity={Math.random() / 2}
        metalness={1}
        transparent={true}
        opacity={0.7}
      />
    ),
    [windowMaterialColor]
  );

  return (
    <>
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
        windowMaterial={windowMaterial}
      />

      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        far={3}
        blur={3}
        rotation={[Math.PI / 2, 0, 0]}
        color={"black"}
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
