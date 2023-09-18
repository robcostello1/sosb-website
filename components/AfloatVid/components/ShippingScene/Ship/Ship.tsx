import { useEffect } from 'react';
import { Euler, Vector3 } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useLoader } from '@react-three/fiber';

type ShipProps = {};

const SHIP_SIZE = 15;
const SHIP_SCALE = new Vector3(SHIP_SIZE, SHIP_SIZE, SHIP_SIZE);
const SHIP_POSITION = new Vector3(-13, 6, 0);
const SHIP_ROTATION = new Euler(0.2, -3.14, -0.43);

const Ship = (_: ShipProps) => {
  const shipModel = useLoader(
    GLTFLoader,
    "/models/ship/ship.gltf",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      // TODO
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  return (
    <group scale={SHIP_SCALE} position={SHIP_POSITION} rotation={SHIP_ROTATION}>
      <primitive object={shipModel.scene} />
    </group>
  );
};

export default Ship;
