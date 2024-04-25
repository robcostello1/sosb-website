import { ReactNode, useEffect } from 'react';

import { VideoContext } from './context';
import { useVideo } from './useVideo';

type VideoProviderProps = {
  children: ReactNode;
  autoStart?: boolean;
  debug?: boolean;
  videoUrl?: string;
  volume?: number;
};

const VideoProvider = ({
  autoStart,
  debug,
  children,
  videoUrl,
  volume = 60,
}: VideoProviderProps) => {
  const values = useVideo({ videoUrl, debug, volume });

  useEffect(() => {
    if (autoStart) {
      window.onclick = function () {
        values.handlePlay();
      };
    }
    return () => {
      window.onclick = null;
    };
  }, [autoStart, values]);

  return (
    <VideoContext.Provider value={values}>{children}</VideoContext.Provider>
  );
};

export default VideoProvider;
