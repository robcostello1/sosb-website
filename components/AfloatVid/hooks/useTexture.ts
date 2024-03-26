import { LinearFilter, Texture } from "three";

import { useTexture as useDreiTexture } from "@react-three/drei";

import { useLoadingStore } from "../state/loading";

// TODO handle additional properties
// @ts-expect-error
export const useTexture: typeof useDreiTexture = (input, onLoad) => {
  const removeItem = useLoadingStore((state) => state.removeItem);

  return useDreiTexture(input, (texture: Texture | Texture[]) => {
    removeItem();

    onLoad?.(texture);
  });
};
