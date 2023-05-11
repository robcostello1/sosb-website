import { useThree } from "@react-three/fiber";
import { useEffect, memo } from "react";

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
  }, [cubeMap]);
};

export default memo(Environment);
