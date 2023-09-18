import { useState } from 'react';
import { DoubleSide, ShaderChunk } from 'three';

import { ShaderMaterialProps } from '@react-three/fiber';

import { Triplet } from '../../../../utils/types';
import { monkeyPatch, noise } from './utils';

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

type IslandsProps = {
  scale: number;
  position: Triplet;
  bounce: number;
  visible: boolean;
};

const DEFAULT_POSITION: Triplet = [0, -1, 0];

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
      <shaderMaterial
        // lights
        side={DoubleSide}
        uniforms={uniforms}
        // {...SHADER_CONFIG}
      />
    </mesh>
  );
};
