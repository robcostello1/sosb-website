import { createContext } from "react";

import { UseSongReturnType } from "../../hooks/useSong";

type SongContextType = UseSongReturnType;

export const SongContext = createContext<SongContextType>({
  barRef: { current: 0 },
  songRef: { current: null },
  analyserRef: { current: null },
  handlePlay: function (): void {
    throw new Error("Function not implemented.");
  },
});
