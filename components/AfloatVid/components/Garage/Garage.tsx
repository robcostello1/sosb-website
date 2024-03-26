import { gsap } from "gsap";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  Texture,
  Vector2,
} from "three";
import { Triplet } from "utils/types";

import Button from "../../../Button";
import { useTexture } from "../../hooks/useTexture";
import GarageLight from "./GarageLight";

const HEIGHT = 4;
const WIDTH = 6;
const LENGTH = 10;
const WALL_THICKNESS = 0.2;
const FRAME_WIDTH = 0.3;

const TEXTURE_REPEAT = 0.5;

type GarageProps = {
  position?: Triplet;
  doorDisabled?: boolean;
  onLoad?: () => void;
  onClickOpen: () => void;
};

const Garage = ({
  position,
  doorDisabled,
  onClickOpen,
  onLoad,
}: GarageProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<Mesh>(null);

  const handleClickOpen = useCallback(() => {
    if (!doorDisabled) {
      setOpen(true);
      onClickOpen();
    }
  }, [doorDisabled, onClickOpen]);

  const [wallsLoaded, setWallsLoaded] = useState(false);
  const textureProps = useTexture(
    {
      map: `/maps/optimised/concrete_layers_02_diff_1k.jpg`,
      roughnessMap: `/maps/optimised/concrete_layers_02_rough_1k.jpg`,
      aoMap: `/maps/optimised/concrete_layers_02_ao_1k.jpg`,
      normalMap: `/maps/optimised/concrete_layers_02_nor_dx_1k.jpg`,
    },
    () => {
      setWallsLoaded(true);
    }
  );

  const [shutterLoaded, setShutterLoaded] = useState(false);
  const shutterTextureProps = useTexture(
    {
      map: `/maps/optimised/painted_metal_shutter_diff_1k.jpg`,
      roughnessMap: `/maps/optimised/painted_metal_shutter_rough_1k.jpg`,
      aoMap: `/maps/optimised/painted_metal_shutter_ao_1k.jpg`,
      normalMap: `/maps/optimised/painted_metal_shutter_nor_dx_1k.jpg`,
    },
    (texture) => {
      (Array.isArray(texture) ? texture : [texture]).forEach((texture) => {
        texture.repeat.y = TEXTURE_REPEAT;
      });
      setShutterLoaded(true);
    }
  );

  useEffect(() => {
    if (wallsLoaded && shutterLoaded) {
      onLoad?.();
    }
  }, [wallsLoaded, shutterLoaded, onLoad]);

  const frameMaterial = useMemo(
    () => (
      <meshStandardMaterial metalness={1} color={0x999999} roughness={0.4} />
    ),
    []
  );

  const doorRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null);

  useEffect(() => {
    if (doorRef.current) {
      const mesh = doorRef.current;
      gsap.to(mesh.scale, {
        duration: 10,
        y: open ? 0 : 1,
      });
      gsap.to(mesh.position, {
        duration: 10,
        y: open ? HEIGHT / 2 : 0,
      });
      gsap.to((mesh.material.map as Texture).repeat, {
        duration: 10,
        y: open ? 0 : TEXTURE_REPEAT,
      });
    }
  }, [doorRef, open]);

  return (
    <group position={position}>
      <GarageLight position={[2, 2.5, -3]} />

      <Button
        ref={buttonRef}
        text="Open"
        position={[WIDTH / 2 - 0.2, 2, -3]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[1.2, 1.2, 1.2]}
        buttonName="garage-door-button" // TODO const
        onClick={handleClickOpen}
      />

      <group position={[0, HEIGHT / 2 - 0.1, -LENGTH / 2]}>
        <mesh ref={doorRef}>
          <boxGeometry args={[WIDTH, HEIGHT, WALL_THICKNESS / 2]} />
          <meshStandardMaterial
            {...shutterTextureProps}
            aoMapIntensity={10}
            normalScale={new Vector2(10, 10)}
          />
        </mesh>
        <mesh position={[(FRAME_WIDTH - WIDTH) / 2, 0, 0]}>
          <boxGeometry args={[FRAME_WIDTH, HEIGHT, WALL_THICKNESS]} />
          {frameMaterial}
        </mesh>
        <mesh position={[(WIDTH - FRAME_WIDTH) / 2, 0, 0]}>
          <boxGeometry args={[FRAME_WIDTH, HEIGHT, WALL_THICKNESS]} />
          {frameMaterial}
        </mesh>
        <mesh position={[0, (HEIGHT - FRAME_WIDTH) / 2, 0]}>
          <boxGeometry args={[WIDTH, FRAME_WIDTH, WALL_THICKNESS]} />
          {frameMaterial}
        </mesh>
      </group>

      <mesh
        position={[0, HEIGHT / 2 - 0.1, LENGTH / 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, WIDTH / LENGTH]}
      >
        <GarageMaterial {...textureProps} />
      </mesh>
      <mesh position={[-WIDTH / 2, HEIGHT / 2 - 0.1, 0]} receiveShadow>
        <GarageMaterial {...textureProps} />
      </mesh>
      <mesh position={[WIDTH / 2, HEIGHT / 2 - 0.1, 0]} receiveShadow>
        <GarageMaterial {...textureProps} />
      </mesh>
      <mesh
        position={[0, HEIGHT, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[1, WIDTH / HEIGHT, 1]}
      >
        <GarageMaterial {...textureProps} />
      </mesh>
    </group>
  );
};

function GarageMaterial(props: { map: Texture; roughnessMap: Texture }) {
  return (
    <>
      <boxGeometry args={[WALL_THICKNESS, HEIGHT, LENGTH]} />
      <meshStandardMaterial
        {...props}
        aoMapIntensity={4}
        normalScale={new Vector2(1, 1)}
      />
    </>
  );
}

export default memo(Garage);
