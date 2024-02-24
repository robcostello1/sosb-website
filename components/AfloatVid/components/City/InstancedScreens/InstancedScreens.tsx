import { useEffect, useRef } from 'react';
import { BufferGeometry, InstancedMesh, Material, Object3D } from 'three';

import { Triplet } from '../../../../../utils/types';
import { DEFAULT_BUILDING_HEIGHT, DEFAULT_BUILDING_WIDTH } from '../BaseBuilding';
import ScreenContents from '../Screen/ScreenContents';

type InstancedScreensProps = {
  count: number;
  params: { position: Triplet; scale: Triplet }[];
};

const InstancedScreens = ({
  params,
  count = params.length,
}: InstancedScreensProps) => {
  const instancedMeshRef =
    useRef<InstancedMesh<BufferGeometry, Material | Material[]>>(null);

  useEffect(() => {
    if (instancedMeshRef.current) {
      const temp = new Object3D();

      for (let i = 0; i < count; i++) {
        let scale = 0;
        const direction = Math.floor(Math.random() * 4);
        const offset: Triplet = [0, 0, 0];
        if (direction === 0) {
          scale = params[i].scale[0];
          offset[2] = (DEFAULT_BUILDING_WIDTH / 2) * params[i].scale[2];
        }
        if (direction === 1) {
          scale = params[i].scale[2];
          offset[0] = (DEFAULT_BUILDING_WIDTH / 2) * params[i].scale[0];
        }
        if (direction === 2) {
          scale = params[i].scale[0];
          offset[2] = (-DEFAULT_BUILDING_WIDTH / 2) * params[i].scale[2];
        }
        if (direction === 3) {
          scale = params[i].scale[2];
          offset[0] = (-DEFAULT_BUILDING_WIDTH / 2) * params[i].scale[0];
        }
        scale = scale / 3 + ((scale * 2) / 3) * Math.random();
        temp.scale.set(scale, scale, 1);
        const rotation = direction * (Math.PI / 2);

        temp.position.set(
          params[i].position[0] + offset[0],
          params[i].scale[1] * DEFAULT_BUILDING_HEIGHT * 0.5 * Math.random() +
            offset[1],
          params[i].position[2] + offset[2]
        );
        temp.rotation.set(0, rotation, 0);
        temp.updateMatrix();
        instancedMeshRef.current.setMatrixAt(i, temp.matrix);
      }

      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count, params]);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      // @ts-expect-error
      args={[null, null, count]}
    >
      <ScreenContents
        boxArgs={[DEFAULT_BUILDING_WIDTH, 10, 0.1]}
        start={false}
      />
    </instancedMesh>
  );
};

export default InstancedScreens;
