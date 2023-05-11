import { MeshProps, useLoader } from "@react-three/fiber";
import { memo } from "react";
import { Mesh } from "three";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

  return (
    <instancedMesh
      scale={[SCALE, SCALE, SCALE]}
      args={[
        (barrelModel.scene.children[0] as Mesh).geometry,
        (barrelModel.scene.children[0] as Mesh).material,
        6,
      ]}
      {...props}
    />
  );
};

export default memo(Barrel);
