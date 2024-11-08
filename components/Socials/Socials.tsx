import { memo, useState } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Triplet } from "utils/types";

import { GradientTexture, Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";

import PhysicsContainer from "./PhysicsContainer";
import { Social } from "./Social";

const SOCIAL_ICON_SIZE = 0.04;
const SOCIAL_ICON_SCALE: [number, number, number] = [
  SOCIAL_ICON_SIZE,
  SOCIAL_ICON_SIZE,
  SOCIAL_ICON_SIZE / 10,
];
const BIN_WALL_THICKNESS = 0.003;
const BIN_BASE_POSITION = 0.01;
const BIN_FALSE_BASE_POSITION = 0.1;
const BIN_BASE_SIZE = 0.09;
const BIN_HEIGHT = 0.15;

type SocialsProps = {
  position?: Triplet;
  rotation?: Triplet;
  onBin: (full: boolean) => void;
};

const Socials = ({ onBin, ...props }: SocialsProps) => {
  const [active, setActive] = useState(false);

  const { data: font } = useLoader(
    FontLoader,
    "/fonts/Font Awesome 6 Brands Regular_Regular.json"
  );

  return (
    <group {...props}>
      <Physics gravity={[0, -1, 0]} debug>
        <PhysicsContainer
          boxWallThickness={BIN_WALL_THICKNESS}
          basePosition={BIN_BASE_POSITION}
          baseSize={BIN_BASE_SIZE}
          boxHeight={BIN_HEIGHT}
          falseBasePosition={BIN_FALSE_BASE_POSITION}
          position={[0, 0, 0]}
          onClick={() => {
            onBin(!active);
            setActive(true);
          }}
        >
          <meshStandardMaterial>
            <GradientTexture
              stops={[0, 0.7, 1]} // As many stops as you want
              colors={["#999999", "#666666", "#333333"]} // Colors need to match the number of stops
            />
          </meshStandardMaterial>
        </PhysicsContainer>

        {/* FB */}
        <Social
          font={font}
          color="#4267B2"
          position={[0, BIN_FALSE_BASE_POSITION + 0.05, 0]}
          scale={SOCIAL_ICON_SCALE}
          rotation={[0, Math.PI / 4, Math.PI / 2]}
          active={active}
          onClick={() => {
            active && window.open("https://www.facebook.com/SOSBmusic", "SOSB Facebook");
          }}
        >
          {"\uf09a"}
        </Social>

        {/* Insta */}
        {/* <SquareSocial
          font={font}
          color="#EF426F"
          position={[0, BIN_FALSE_BASE_POSITION + 0.1, 0]}
          scale={SOCIAL_ICON_SCALE}
          rotation={[0, Math.PI / 3, Math.PI / 2]}
          active={active}
          onClick={() => {
            active && window.open("https://instagram.com/sosbmusic", "SOSB Instagram");
          }}
        >
          {"\uf16d"}
        </SquareSocial> */}

        {/* Spotify */}
        {/* <Social
          font={font}
          color="#1DB954"
          position={[0, BIN_FALSE_BASE_POSITION + 0.15, 0]}
          scale={SOCIAL_ICON_SCALE}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
          active={active}
          onClick={() => {
            active &&
              window.open(
                "https://open.spotify.com/artist/5l73vUu289Rs8q1bYffw6q", "SOSB Spotify"
              );
          }}
        >
          {"\uf1bc"}
        </Social> */}

        <RigidBody includeInvisible>
          <Plane
            position={[0, 0.0085, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            args={[10, 10]}
            visible={false}
          />
        </RigidBody>
      </Physics>
    </group>
  );
};

export default memo(Socials);
