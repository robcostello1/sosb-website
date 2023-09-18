import gsap from 'gsap';
import { useContext, useRef, useState } from 'react';
import {
    DoubleSide, Mesh, PlaneGeometry, RawShaderMaterial, ShaderChunk, Uniform, Vector3
} from 'three';

import { ShaderMaterialProps, useFrame } from '@react-three/fiber';

import { Triplet } from '../../../../utils/types';
// @ts-ignore
import testFragmentShader from '../../shaders/test/fragment.glsl';
// @ts-ignore
import testVertexShader from '../../shaders/test/vertex.glsl';
import { SongContext } from '../SongProvider';
import { getPosition, monkeyPatch, noise } from './utils';

type IslandsProps = {
  scale: number;
  position: Triplet;
  bounce: number;
  visible: boolean;
};

const DEFAULT_POSITION: Triplet = [0, -1, 0];

const Islands = ({
  scale = 200,
  position = DEFAULT_POSITION,
  visible,
  bounce,
}: IslandsProps) => {
  const time = useRef(0);
  const { analyserRef } = useContext(SongContext);
  const meshRef = useRef<Mesh<PlaneGeometry, RawShaderMaterial>>(null);

  const [finalPosition] = useState(() => getPosition(position, visible));

  const uniformsRef = useRef({
    uSize: { value: 6 },
    uAmplitude: { value: 0.6 },
    uSpeed: { value: 0.06 },
    uPosition: new Uniform(new Vector3(...position)),
    uTime: { value: 0 },
    uBulge: { value: 0.001 },
    uScale: { value: scale },
  });

  useFrame((_, delta) => {
    if (visible && meshRef.current) {
      // Move the time
      time.current += delta;
      meshRef.current.material.uniforms.uTime.value = time.current;

      gsap.to(meshRef.current.position, {
        duration: (32 * 120) / 123,
        y: getPosition(position, visible)[1],
      });

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
      visible={visible}
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={finalPosition}
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

// TODO: https://codepen.io/marco_fugaro/pen/xxZWPWJ?editors=0010
const SIZE = 100;
const RESOLUTION = 256;
const SHADER_CONFIG: ShaderMaterialProps = {
  extensions: {
    derivatives: true,
    fragDepth: false,
    drawBuffers: false,
    shaderTextureLOD: false,
  },
  defines: {
    STANDARD: "",
    PHYSICAL: "",
  },
  vertexShader: monkeyPatch(ShaderChunk.meshphysical_vert, {
    header: `
      uniform float time;
      uniform float amplitude;
      uniform float speed;
      uniform float frequency;

      ${noise()}
      
      // the function which defines the displacement
      float displace(vec3 point) {
        return noise(vec3(point.x * frequency, point.z * frequency, time * speed)) * amplitude;
      }
      
      // http://lolengine.net/blog/2013/09/21/picking-orthogonal-vector-combing-coconuts
      vec3 orthogonal(vec3 v) {
        return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
        : vec3(0.0, -v.z, v.y));
      }
    `,
    // adapted from http://tonfilm.blogspot.com/2007/01/calculate-normals-in-shader.html
    main: `
      vec3 displacedPosition = position + normal * displace(position);


      float offset = ${SIZE / RESOLUTION};
      vec3 tangent = orthogonal(normal);
      vec3 bitangent = normalize(cross(normal, tangent));
      vec3 neighbour1 = position + tangent * offset;
      vec3 neighbour2 = position + bitangent * offset;
      vec3 displacedNeighbour1 = neighbour1 + normal * displace(neighbour1);
      vec3 displacedNeighbour2 = neighbour2 + normal * displace(neighbour2);

      // https://i.ya-webdesign.com/images/vector-normals-tangent-16.png
      vec3 displacedTangent = displacedNeighbour1 - displacedPosition;
      vec3 displacedBitangent = displacedNeighbour2 - displacedPosition;

      // https://upload.wikimedia.org/wikipedia/commons/d/d2/Right_hand_rule_cross_product.svg
      vec3 displacedNormal = normalize(cross(displacedTangent, displacedBitangent));
    `,

    "#include <defaultnormal_vertex>": ShaderChunk.defaultnormal_vertex.replace(
      // transformedNormal will be used in the lighting calculations
      "vec3 transformedNormal = objectNormal;",
      `vec3 transformedNormal = displacedNormal;`
    ),

    // transformed is the output position
    "#include <displacementmap_vertex>": `
      transformed = displacedPosition;
    `,
  }),

  fragmentShader: ShaderChunk.meshphysical_frag,
};

const Islands2 = ({
  // TODO
  scale = 200,
  position = DEFAULT_POSITION,
  visible,
  bounce,
}: IslandsProps) => {
  const [uniforms] = useState({
    diffuse: { value: "#5B82A6" },
    roughness: { value: 0.5 },
    noise: {
      value: {
        amplitude: 0.4,
        frequency: 1,
        speed: 1,
      },
    },
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[SIZE, SIZE, RESOLUTION, RESOLUTION]} />
      {/* <shaderMaterial
        lights
        side={DoubleSide}
        uniforms={uniforms}
        {...SHADER_CONFIG}
      /> */}
    </mesh>
  );
};

export default Islands;
