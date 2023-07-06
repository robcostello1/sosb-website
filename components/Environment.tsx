import { memo, useEffect } from 'react';

import { useThree } from '@react-three/fiber';

const Environment = () => {
  const { scene } = useThree();

  // @ts-ignore
  const [cubeMap] = useLoader(CubeTextureLoader, [
    // @ts-ignore
    [
      "/maps/city/px.jpg",
      "/maps/city/nx.jpg",
      "/maps/city/py.jpg",
      "/maps/city/ny.jpg",
      "/maps/city/pz.jpg",
      "/maps/city/nz.jpg",
    ],
  ]);

  useEffect(() => {
    scene.background = cubeMap;
  }, [cubeMap, scene]);

  return null;
};

export default memo(Environment);
