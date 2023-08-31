import { ReactNode, useEffect } from 'react';

import { useSong } from '../../hooks';
import { SongContext } from './context';

type SongProviderProps = {
  autoStart?: boolean;
  children: ReactNode;
};

const SongProvider = ({ autoStart, children }: SongProviderProps) => {
  const songValues = useSong();

  useEffect(() => {
    if (autoStart) {
      window.onclick = function () {
        songValues.handlePlay();
      };
    }
    return () => {
      window.onclick = null;
    };
  }, [autoStart, songValues]);

  return (
    <SongContext.Provider value={songValues}>{children}</SongContext.Provider>
  );
};

export default SongProvider;
