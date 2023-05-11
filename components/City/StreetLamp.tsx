import { useRef, memo } from "react";
import { Mesh } from "three";
import { VectorProp, RotationProp } from "../consts";

type StreetLampProps = {
  position?: VectorProp;
  scale?: VectorProp;
  rotation?: RotationProp;
};

const StreetLamp = (props: StreetLampProps) => {
  const targetRef = useRef<Mesh>(null);
  return (
    <group {...props}>
      <mesh ref={targetRef} scale={[0.01, 0.01, 0.01]} position={[0, -1, 0]}>
        <boxGeometry />
      </mesh>

      <mesh scale={[0.02, 0.01, 0.06]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial
          roughness={1}
          emissive={"yellow"}
          emissiveIntensity={10}
        />
      </mesh>

      <mesh
        position={[-0.04, -0.295, 0]}
        scale={[0.01, 0.6, 0.01]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow
      >
        <cylinderGeometry />
        <meshStandardMaterial color={0x666666} />
      </mesh>

      <spotLight
        position={[0, 0, 0]}
        castShadow
        penumbra={0.6}
        intensity={0.8}
        angle={1.4}
        color={"lightyellow"}
        target={targetRef.current || undefined}
      />
    </group>
  );
};

export default memo(StreetLamp);
