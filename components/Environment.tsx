import { memo, useEffect } from "react";
import { getStaticAsset } from "utils/utils";

import { useThree } from "@react-three/fiber";

const Environment = () => {
  const { scene } = useThree();

  // @ts-ignore
  const [cubeMap] = useLoader(CubeTextureLoader, [
    // @ts-ignore
    [
      getStaticAsset("/maps/city/px.jpg"),
      getStaticAsset("/maps/city/nx.jpg"),
      getStaticAsset("/maps/city/py.jpg"),
      getStaticAsset("/maps/city/ny.jpg"),
      getStaticAsset("/maps/city/pz.jpg"),
      getStaticAsset("/maps/city/nz.jpg"),
    ],
  ]);

  useEffect(() => {
    scene.background = cubeMap;
  }, [cubeMap, scene]);

  return null;
};

export default memo(Environment);
