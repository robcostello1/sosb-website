import { memo, ReactNode } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Triplet } from "utils/types";

import { GradientTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import Bin from "./Bin";
import SocialStatic from "./SocialStatic";
const BIN_WALL_THICKNESS = 0.003;
const BIN_BASE_POSITION = 0.01;
const BIN_BASE_SIZE = 0.09;
const BIN_HEIGHT = 0.15;

type SocialsProps = {
  position?: Triplet;
  rotation?: Triplet;
  trash?: ReactNode;
};

const Socials = ({ trash, ...props }: SocialsProps) => {

  const { data: font } = useLoader(
    FontLoader,
    "/fonts/Font Awesome 6 Brands Regular_Regular.json"
  );

  return (
    <group {...props}>
      <Bin
        boxWallThickness={BIN_WALL_THICKNESS}
        basePosition={BIN_BASE_POSITION}
        baseSize={BIN_BASE_SIZE}
        boxHeight={BIN_HEIGHT}
        falseBasePosition={0}
        position={[0, BIN_BASE_SIZE / 2 + BIN_WALL_THICKNESS + 0.008, 0]}
        rotation={[Math.PI / 2, 0, 1]}
      >
        <meshStandardMaterial >
          <GradientTexture
            stops={[0, 0.7, 1]} // As many stops as you want
            colors={["#333333", "#111111", "#000000"]} // Colors need to match the number of stops
          />
        </meshStandardMaterial>
      </Bin>

      <group position={[-0.17, 0, 0.11]} rotation={[0, -1, 0]} scale={[0.11, 0.11, 0.11]}>
        {trash}
      </group>

      {/* Spotify */}
      <SocialStatic
        font={font}
        color="#1DB954"
        position={[-0.22, 0.02, 0.12]}
        rotation={[-1.3, 2.9, 0.3]}
        onClick={() => {
          window.open("https://open.spotify.com/artist/5l73vUu289Rs8q1bYffw6q", "SOSB Spotify");
        }}
      >
        {"\uf1bc"}
      </SocialStatic>

      {/* FB */}
      <SocialStatic
        font={font}
        color="#4267B2"
        position={[-0.12, 0.007, 0.17]}
        rotation={[Math.PI / 2, 0, 3.3]}
        onClick={() => {
          window.open("https://www.facebook.com/SOSBmusic", "SOSB Facebook");
        }}
      >
        {"\uf09a"}
      </SocialStatic>

      {/* Insta */}
      <SocialStatic
        font={font}
        color="#EF426F"
        position={[-0.17, 0.04, 0.02]}
        rotation={[0, 0, 0]}
        onClick={() => {
          window.open("https://instagram.com/sosbmusic", "SOSB Instagram");
        }}
      >
        {"\uf16d"}
      </SocialStatic>

      {/* Insta */}
      {/* <SquareSocial
        font={font}
        color="#EF426F"
        position={[0, BIN_FALSE_BASE_POSITION + 0.1, 0]}
        scale={SOCIAL_ICON_SCALE}
        rotation={[0, Math.PI / 3, Math.PI / 2]}
        active={active}
        onClick={() => {
          active && window.open("https://instagram.com/sosbmusic");
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
              "https://open.spotify.com/artist/5l73vUu289Rs8q1bYffw6q"
            );
        }}
      >
        {"\uf1bc"}
      </Social> */}
    </group>
  );
};

export default memo(Socials);
