import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Raft = () => {
  const raftModel = useLoader(GLTFLoader, "/raft.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    // TODO
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });

  const { camera } = useThree();

  const raft = useRef<Mesh>(null);

  useEffect(() => {
    camera.position.set(0, 2, 0);
  }, []);

  return (
    <group scale={[0.01, 0.01, 0.01]} position={[0, 0.15, 0]}>
      <primitive object={raftModel.scene} />
    </group>
  );
};

export default Raft;
