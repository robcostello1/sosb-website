import { memo, useMemo } from "react";
import { BufferGeometry, FrontSide, Mesh, MeshStandardMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { InstancedMeshProps, MeshProps, useLoader } from "@react-three/fiber";

const SCALE = 0.2;

const Barrel = (props: Pick<MeshProps, "position" | "rotation">) => {
  const barrelModel = useLoader(GLTFLoader, "/models/barrel.glb");

  const barrelArgs = useMemo<InstancedMeshProps["args"]>(() => {
    const mesh = barrelModel.scene.children[0] as Mesh<
      BufferGeometry,
      MeshStandardMaterial
    >;
    mesh.material.side = FrontSide;
    return [mesh.geometry, mesh.material, 6];
  }, [barrelModel.scene.children]);

  return (
    <instancedMesh scale={[SCALE, SCALE, SCALE]} args={barrelArgs} {...props} />
  );
};

export default memo(Barrel);
