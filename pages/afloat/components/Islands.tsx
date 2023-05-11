// @ts-ignore
import testVertexShader from "../shaders/test/vertex.glsl";
// @ts-ignore
import testFragmentShader from "../shaders/test/fragment.glsl";
import {
  DoubleSide,
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Uniform,
  Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef, memo } from "react";
import { Triplet } from "../../../utils/types";
import gsap from "gsap";

const Islands = ({
  analyserRef,
  scale,
  position,
  bounce,
}: {
  analyserRef: MutableRefObject<AnalyserNode | null>;
  scale: number;
  position: Triplet;
  bounce: number;
}) => {
  const time = useRef(0);
  const meshRef = useRef<Mesh<PlaneGeometry, RawShaderMaterial>>(null);
  const uniformsRef = useRef({
    uSize: { value: 6 },
    uAmplitude: { value: 1 },
    uSpeed: { value: 0.04 },
    uPosition: new Uniform(new Vector3(...position)),
    uTime: { value: 0 },
    uBulge: { value: 0.001 },
    uScale: { value: scale },
  });

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Move the time
      time.current += delta;
      meshRef.current.material.uniforms.uTime.value = time.current;

      if (analyserRef.current && bounce) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        analyserRef.current.getFloatTimeDomainData(dataArray);
        let sumSquares1 = 0.0;
        let sumSquares2 = 0.0;
        Array.from(dataArray).forEach((amplitude, index) => {
          if (index < dataArray.length / 2) {
            sumSquares1 += amplitude * amplitude;
          }
          sumSquares2 += amplitude * amplitude;
        });

        gsap.to(meshRef.current.material.uniforms.uAmplitude, {
          duration: 0.4,
          value: 0.8 + (Math.sqrt(sumSquares1 / dataArray.length) / 3) * bounce,
        });
        gsap.to(meshRef.current.material.uniforms.uSize, {
          duration: 3,
          value: 3 + Math.sqrt((sumSquares2 / dataArray.length) * 200) * bounce,
        });
        gsap.to(meshRef.current.material.uniforms.uBulge, {
          duration: 3,
          value:
            0.005 * Math.sqrt((sumSquares2 / dataArray.length) * 10) * bounce,
        });
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={position}
      scale={[scale, scale, scale]}
    >
      <rawShaderMaterial
        vertexShader={testVertexShader}
        fragmentShader={testFragmentShader}
        side={DoubleSide}
        uniforms={uniformsRef.current}
      />

      <planeGeometry args={[1, 1, 256 / 2, 256 / 2]} />
    </mesh>
  );
};

export default memo(Islands);
