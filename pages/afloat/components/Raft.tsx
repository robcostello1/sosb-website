import { useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type RaftProps = {
  showModel?: boolean;
};

const Raft = ({ showModel }: RaftProps) => {
  const { camera } = useThree();

  useEffect(() => {
    // TODO move the camera
    camera.position.set(0, 2, 0);
  }, []);

  return <RaftContent showModel={showModel} />;
};

export function RaftContent({ showModel = true }: RaftProps) {
  const raftModel = useLoader(GLTFLoader, "/raft.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    // TODO
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });

  return (
    <>
      <group scale={[0.01, 0.01, 0.01]} position={[0, 0.08, 0]}>
        {showModel && <primitive object={raftModel.scene} />}
      </group>
    </>
  );
}

export default Raft;
