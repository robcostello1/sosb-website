import { memo, useMemo } from 'react';
import { BufferGeometry, FrontSide, Mesh, MeshStandardMaterial } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { InstancedMeshProps, MeshProps, useLoader } from '@react-three/fiber';

const SCALE = 0.2;

const Barrel = (props: Pick<MeshProps, "position" | "rotation">) => {
  const barrelModel = useLoader(
    GLTFLoader,
    "/models/barrel/barrel.gltf",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      // TODO
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

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
