import { memo, useMemo } from "react";

import { getStaticAsset } from "../../../../utils/utils";
import { useTexture } from "../../hooks/useTexture";

type FridgeProps = {};

const materialProps = {
  metalness: 0.1,
  roughness: 0.1,
};

const FridgeContents = (_: FridgeProps) => {
  const { map: backMap } = useTexture(
    {
      map: getStaticAsset("/maps/optimised/fridge.jpg"),
    },
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((texture) => {
        texture.repeat.set(0.36, 1);
      });
    }
  );

  const frontMap = useMemo(() => {
    const texture = backMap.clone();
    texture.offset.set(0.64, 0);
    return texture;
  }, [backMap]);

  const rightSideMap = useMemo(() => {
    const texture = backMap.clone();
    texture.repeat.set(0.25, 1);
    texture.offset.set(0.365, 0);
    return texture;
  }, [backMap]);

  const leftSideMap = useMemo(() => {
    const texture = rightSideMap.clone();
    texture.offset.set(0.385, 0);
    return texture;
  }, [rightSideMap]);

  const topMap = useMemo(() => {
    const texture = rightSideMap.clone();
    texture.rotation = Math.PI * 0.5;
    return texture;
  }, [rightSideMap]);

  return (
    <>
      <boxGeometry args={[0.6, 1.5, 0.6]} />
      <meshStandardMaterial
        map={rightSideMap}
        attach="material-0"
        {...materialProps}
      />
      <meshStandardMaterial
        map={leftSideMap}
        attach="material-1"
        {...materialProps}
      />
      <meshStandardMaterial
        map={topMap}
        attach="material-2"
        {...materialProps}
      />
      <meshStandardMaterial
        attach="material-3"
        color={0x777777}
        {...materialProps}
      />
      <meshStandardMaterial
        map={frontMap}
        attach="material-4"
        {...materialProps}
      />
      <meshStandardMaterial map={backMap} attach="material-5" roughness={1} />
    </>
  );
};

export const FridgeMesh = () => (
  <mesh>
    <FridgeContents />
  </mesh>
);

export default memo(FridgeContents);
