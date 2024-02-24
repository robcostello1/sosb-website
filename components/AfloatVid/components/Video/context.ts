import { createContext } from 'react';

import { UseVideoReturnType } from './useVideo';

export type VideoContextType = UseVideoReturnType;

export const VideoContext = createContext<VideoContextType>({
  barRef: { current: 0 },
  mediaRef: { current: undefined },
  analyserRef: { current: null },
  mediaLoaded: false,
  handlePlay: () => {},
});
