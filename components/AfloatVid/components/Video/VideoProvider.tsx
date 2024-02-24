import { ReactNode, useEffect } from 'react';

import { VideoContext } from './context';
import { useVideo } from './useVideo';

type VideoProviderProps = {
  autoStart?: boolean;
  children: ReactNode;
};

const VideoProvider = ({ autoStart, children }: VideoProviderProps) => {
  const values = useVideo();

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
