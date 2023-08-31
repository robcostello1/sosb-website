import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { BoxGeometry, Group, IUniform, Mesh, RawShaderMaterial, Uniform, Vector3 } from 'three';

import { GroupProps, MeshProps, useFrame } from '@react-three/fiber';

import { Triplet } from '../../../../utils/types';
// @ts-ignore
import fragmentShader from '../../shaders/vine/fragment.glsl';
// @ts-ignore
import vertexShader from '../../shaders/vine/vertex.glsl';

type VinesProps = Pick<GroupProps, "scale" | "rotation" | "position"> & {
  debug?: boolean;
  geometryDimensions: Triplet;
  includeSides?: boolean;
  pulsate?: number;
  vinesAmount: number;
};

const Vines = ({
  debug = false,
  geometryDimensions,
  includeSides = true,
  pulsate,
  vinesAmount = 2,
  ...props
}: VinesProps) => {
  const vineComplexity = 3;
  const vineRef = useRef<Mesh<BoxGeometry, RawShaderMaterial>>(null);
  const vineGroup = useRef<Group>(null);
  const vineClone = useRef<Mesh<BoxGeometry, RawShaderMaterial>>();

  const time = useRef(0);

  const vine1Seed = useMemo(() => Math.random() * 100, []);
  const vine2Seed = useMemo(() => Math.random() * 100, []);

  const applyPulsate = useCallback(
    (uniforms: Record<string, IUniform>) => {
      if (pulsate) {
        const pulse = Math.sin((123 / (time.current * 60)) * Math.PI * 4);

        uniforms.uAmount.value = vinesAmount + Math.max(pulse, 0) * pulsate;
      }
    },
    [vinesAmount, pulsate]
  );

  const applyTime = useCallback(
    (uniforms: Record<string, IUniform>, time: number, seed: number) => {
      uniforms.uTime.value = time + seed;
    },
    []
  );

  useFrame((_, delta) => {
    // Move the time
    time.current += delta;
    if (debug) {
      return;
    }
    if (vineRef.current) {
      const uniforms = vineRef.current.material.uniforms;
      applyTime(uniforms, time.current, vine1Seed);
      applyPulsate(uniforms);
    }
    0;
    if (vineClone.current) {
      vineClone.current.material = vineClone.current.material.clone();
      const uniforms = vineClone.current.material.uniforms;

      applyTime(uniforms, time.current, vine2Seed);
      applyPulsate(uniforms);
    }
  });
  const vine1 = useMemo(() => {
    return (
      <mesh ref={vineRef}>
        <boxGeometry
          args={[
            geometryDimensions[0] * 0.99,
            geometryDimensions[1] * 1.01,
            geometryDimensions[2] * 1.01,
            Math.pow(2, vineComplexity),
            Math.pow(2, vineComplexity),
          ]}
        />
        {debug ? (
          <meshBasicMaterial opacity={0.5} transparent />
        ) : (
          <rawShaderMaterial
            depthWrite={false}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent
            uniforms={{
              uTime: new Uniform(0),
              uSpeed: new Uniform(0.05),
              uAmount: new Uniform(vinesAmount),
              uScale: props.scale
                ? new Uniform(
                    new Vector3(
                      // @ts-expect-error
                      props.scale.x * geometryDimensions[0],
                      // @ts-expect-error
                      props.scale.y * geometryDimensions[1],
                      // @ts-expect-error
                      props.scale.z * geometryDimensions[2]
                    ).multiplyScalar(0.02)
                  )
                : new Uniform(
                    new Vector3(...geometryDimensions).multiplyScalar(0.02)
                  ),
            }}
          />
        )}
      </mesh>
    );
  }, [debug, geometryDimensions, props.scale, vinesAmount]);

  useEffect(() => {
    if (vineRef.current && vineGroup.current && includeSides) {
      vineClone.current = vineRef.current.clone();

      vineClone.current.rotation.y = Math.PI / 2;
      vineGroup.current.add(vineClone.current);
    }
  }, [includeSides]);

  return (
    <group ref={vineGroup} {...props}>
      {vine1}
    </group>
  );
};

export default memo(Vines);
