import { memo } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Triplet } from "utils/types";

import { GradientTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import Bin from "./Bin";
import SocialStatic from "./SocialStatic";

const SOCIAL_ICON_SIZE = 0.04;
const SOCIAL_ICON_SCALE: [number, number, number] = [
  SOCIAL_ICON_SIZE,
  SOCIAL_ICON_SIZE,
  SOCIAL_ICON_SIZE / 10,
];
const BIN_WALL_THICKNESS = 0.003;
const BIN_BASE_POSITION = 0.01;
const BIN_BASE_SIZE = 0.09;
const BIN_HEIGHT = 0.15;

type SocialsProps = {
  position?: Triplet;
  rotation?: Triplet;
};

const Socials = (props: SocialsProps) => {

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
        rotation={[Math.PI/2, 0, 1]}
      >
        <meshStandardMaterial >
          <GradientTexture
            stops={[0, 0.7, 1]} // As many stops as you want
            colors={["#333333", "#111111", "#000000"]} // Colors need to match the number of stops
          />
        </meshStandardMaterial>
      </Bin>

      {/* FB */}
      <SocialStatic
        font={font}
        color="#4267B2"
        position={[0, 0, 0]}
        scale={SOCIAL_ICON_SCALE}
        rotation={[0, 0, 0]}
        onClick={() => {
          window.open("https://www.facebook.com/SOSBmusic");
        }}
      >
        {"\uf09a"}
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
