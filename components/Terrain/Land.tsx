import { MeshProps } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  BufferAttribute,
  Color,
  DoubleSide,
  PlaneGeometry,
  Vector2,
} from "three";

// @ts-ignore
import testVertexShader from "../../shaders/test/vertex.glsl";
// @ts-ignore
import testFragmentShader from "../../shaders/test/fragment.glsl";

const uniforms = {
  uFrequency: { value: new Vector2(10, 5) },
  uTime: { value: 0 },
  uColor: { value: new Color("orange") },
  //   uTexture: { value: flagTexture },
};

const Land = (props: Omit<MeshProps, "rotation">) => {
  const geo = useRef<PlaneGeometry>(null);
  const int = useRef<any>();

  useEffect(() => {
    if (geo.current) {
      const count = geo.current.attributes.position.count;
      const randoms = new Float32Array(count);
      clearInterval(int.current);

      //   int.current = setInterval(() => {
      for (let i = 0; i < count; i++) {
        // @ts-ignore
        const scale = props.scale[1] || 1;
        randoms[i] = Math.random() * Math.random() * Math.random() * scale;
      }

      geo.current?.setAttribute("aRandom", new BufferAttribute(randoms, 1));
      //   }, (1000 * 60) / 123);
    }
  }, [geo.current]);

  return (
    <mesh {...props} rotation={[-Math.PI / 2, 0, 0]} position={[0, -30, 0]}>
      <planeGeometry args={[100, 100, 128, 128]} ref={geo} />
      <rawShaderMaterial
        vertexShader={testVertexShader}
        fragmentShader={testFragmentShader}
        uniforms={uniforms}
        side={DoubleSide}
      />
    </mesh>
  );
};
export default Land;
