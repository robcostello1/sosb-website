import gsap, { Power2 } from "gsap";
import { Triplet } from "../../../../utils/types";

import { MeshProps, useFrame } from "@react-three/fiber";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";
import BaseBuilding, {
  BUILDING_TEXTURE_HEIGHT,
  DEFAULT_BUILDING_HEIGHT,
} from "./BaseBuilding";
import { TextureProps } from "./types";

type BuildingProps = Omit<MeshProps, "scale" | "position"> & {
  bounce?: number;
  smoothMoves?: number;
  scale?: Triplet;
  position?: Triplet;
  textureProps: TextureProps;
  analyserRef?: MutableRefObject<AnalyserNode | null>;
};

const ease = Power2.easeInOut;

const BouncingBuilding = ({
  scale = [1, 1, 1],
  position = [0, 0, 0],
  analyserRef,
  bounce,
  smoothMoves,
  textureProps,
  ...props
}: BuildingProps) => {
  const [resize, setResize] = useState(1);

  const vectorScale = useMemo(() => new Vector3(...scale), [scale]);
  const vectorPosition = useMemo(
    () =>
      new Vector3(
        position[0],
        position[1] + (DEFAULT_BUILDING_HEIGHT * vectorScale.y) / 2,
        position[2]
      ),
    [position]
  );

  const meshRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  const applyResize = useCallback(
    (
      mesh: Mesh<BoxGeometry, MeshStandardMaterial>,
      size: number,
      duration: number
    ) => {
      const finalSize = vectorScale.y + vectorScale.y * size;

      gsap.to(mesh.scale, {
        duration,
        ease,
        y: finalSize,
      });

      gsap.to(mesh.position, {
        duration,
        ease,
        y: position[1] + (DEFAULT_BUILDING_HEIGHT * finalSize) / 2,
      });

      mesh.material.map &&
        gsap.to(mesh.material.map?.repeat, {
          duration,
          ease,
          y: (DEFAULT_BUILDING_HEIGHT * finalSize) / BUILDING_TEXTURE_HEIGHT,
        });
    },
    [DEFAULT_BUILDING_HEIGHT, vectorScale.y, position?.[1], smoothMoves]
  );

  useEffect(() => {
    setTimeout(() => {
      if (meshRef.current && !bounce && smoothMoves) {
        applyResize(meshRef.current, resize * smoothMoves, 1);
        setResize(Math.random() * 2);
      }
    }, Math.random() * 5000);
  }, [resize, meshRef.current, smoothMoves]);

  const [randomBand, dataArray] = useMemo(() => {
    if (analyserRef?.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      return [Math.floor(dataArray.length * Math.random()), dataArray];
    }

    return [undefined, undefined];
  }, [analyserRef?.current]);

  useFrame(() => {
    if (meshRef.current) {
      if (analyserRef?.current && dataArray && bounce && randomBand) {
        analyserRef.current.getFloatTimeDomainData(dataArray);

        const scale = vectorScale.y / 2 + dataArray[randomBand] * bounce;
        const duration = 0.1;

        applyResize(meshRef.current, scale, duration);
      }
    }
  });

  return (
    <BaseBuilding
      // @ts-expect-error
      ref={meshRef}
      textureProps={textureProps}
      scale={vectorScale}
      position={vectorPosition}
      {...props}
    />
  );
};

export default BouncingBuilding;
