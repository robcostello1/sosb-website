import { forwardRef, useEffect } from "react";
import { Color, DoubleSide, Group, Mesh, MeshBasicMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { GroupProps, useLoader } from "@react-three/fiber";

type ArcProps = Omit<GroupProps, "rotation"> & {
  color: Color;
};

const Arc = forwardRef<Group, ArcProps>(({ color, ...groupProps }, ref) => {
  const arcModel = useLoader(GLTFLoader, "/models/arc.glb");

  useEffect(() => {
    const mesh = arcModel.scene.children[0] as Mesh;

    mesh.material = new MeshBasicMaterial({
      color,
      side: DoubleSide,
    });
  }, [arcModel, color]);

  return (
    <group ref={ref} {...groupProps} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={arcModel.scene} />
    </group>
  );
});

export default Arc;
