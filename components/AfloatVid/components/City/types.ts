import { Texture } from 'three';

export type TextureProps = {
  map: Texture;
  roughnessMap?: Texture;
  normalMap?: Texture;
  alphaMap?: Texture;
};
