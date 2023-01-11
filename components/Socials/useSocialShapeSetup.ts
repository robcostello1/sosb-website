import { PublicApi, Triplet } from "@react-three/cannon";
import { RefObject, useEffect, useCallback } from "react";
import {
  Mesh,
  BufferGeometry,
  Material,
  MeshStandardMaterial,
  Vector3,
} from "three";

export const useSocialShapeSetup = (
  ref: RefObject<Mesh<BufferGeometry, Material | Material[]>>,
  api: PublicApi,
  scale: Triplet,
  active: boolean
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.scale(
        scale[0] * 1.4,
        scale[1] * 1.4,
        scale[2] * 1.4
      );
      ref.current.geometry.center();
      ref.current.geometry.rotateX(-Math.PI / 2);
    }
  }, []);

  useEffect(() => {
    if (active) {
      api.position.subscribe((pos) => {
        // TODO
        const target = [0, 0, 0];

        // api.applyImpulse([(target[0] - pos[0]) * 0.01, 0, 0], [0, 0, 0]);

        const distance = new Vector3(...pos).distanceTo(new Vector3(...target));

        api.applyImpulse(
          new Vector3()
            .copy(new Vector3(...pos))
            .multiplyScalar(-1 / distance / 10)
            .toArray(),
          [0, 0, 0]
        );
      });
    }
  }, [active, api, ref.current?.position]);

  // This is BAD react
  const handlePointerEnter = useCallback(() => {
    (ref.current?.material as MeshStandardMaterial[])[0].emissiveIntensity = 4;
  }, [ref.current?.material]);
  const handlePointerLeave = useCallback(() => {
    (ref.current?.material as MeshStandardMaterial[])[0].emissiveIntensity = 1;
  }, [ref.current?.material]);

  return {
    handlePointerEnter,
    handlePointerLeave,
  };
};
