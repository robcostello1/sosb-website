import { useEffect, useRef } from 'react';
import { InstancedMesh, Mesh, Object3D } from 'three';

const InstancedTestContent = () => {
  useEffect(() => {
    console.log("I'm a test");
  }, []);

  return (
    <>
      <boxGeometry />
      <meshPhongMaterial />
    </>
  );
};

const InstancedTest = ({ count = 100, temp = new Object3D() }) => {
  const instancedMeshRef = useRef<InstancedMesh>(null);

  useEffect(() => {
    if (instancedMeshRef.current) {
      // Set positions
      for (let i = 0; i < count; i++) {
        temp.position.set(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        );
        temp.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, temp.matrix);
      }
      // Update the instance
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count, temp]);

  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      <InstancedTestContent />
    </instancedMesh>
  );
};

export default InstancedTest;
