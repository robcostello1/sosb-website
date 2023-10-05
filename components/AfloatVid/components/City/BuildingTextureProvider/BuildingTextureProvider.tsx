import { createContext, ReactNode } from "react";

import { useBuildingTextures } from "../hooks";
import { TextureProps } from "../types";

type BuildingTextureProviderProps = {
  children: ReactNode;
};

export const BuildingTextureContext = createContext<TextureProps[]>([]);

const BuildingTextureProvider = ({
  children,
}: BuildingTextureProviderProps) => {
  const textures = useBuildingTextures();

  return (
    <BuildingTextureContext.Provider value={textures}>
      {children}
    </BuildingTextureContext.Provider>
  );
};

export default BuildingTextureProvider;
