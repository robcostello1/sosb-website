import { createContext } from 'react';

import { UseSongReturnType } from '../../hooks/useSong';

type SongContextType = UseSongReturnType;

export const SongContext = createContext<SongContextType>({
  barRef: { current: 0 },
  mediaRef: { current: null },
  analyserRef: { current: null },
  handlePlay: () => {},
});
