import React, { memo, useMemo, useRef } from "react";
import { PlaneGeometry, TextureLoader, Vector3 } from "three";
import { Water, WaterOptions } from "three/examples/jsm/objects/Water.js";

import {
  extend,
  Object3DNode,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";

import { REPEAT_WRAPPING } from "../../utils/consts";
import { Triplet } from "../../utils/types";

extend({ Water });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: Object3DNode<Water, typeof Water>;
    }
  }
}
const scale = 1;

const Ocean = ({
  position,
  waterColor = 0x0064b5,
}: {
  position?: Triplet;
  waterColor?: number;
}) => {
  const ref = useRef<Water>(null);
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(TextureLoader, "/waternormals.jpg");

  waterNormals.wrapS = waterNormals.wrapT = REPEAT_WRAPPING;
  const geom = useMemo(() => new PlaneGeometry(30000, 30000), []);
  const config = useMemo<WaterOptions>(
    () => ({
      textureWidth: 1024,
      textureHeight: 1024,
      waterNormals,
      sunDirection: new Vector3(),
      waterColor: waterColor,
      distortionScale: 0.3,
      fog: false,
      // @ts-ignore
      format: gl.encoding,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals]
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta / 5;
    }
  });

  return (
    <water
      scale={[scale, scale, scale]}
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={position}
    />
  );
};

export default memo(Ocean);
