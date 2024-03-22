import { ReactNode, useEffect } from "react";

import { VideoContext } from "./context";
import { useVideo } from "./useVideo";

type VideoProviderProps = {
  autoStart?: boolean;
  debug?: boolean;
  children: ReactNode;
};

const VideoProvider = ({ autoStart, debug, children }: VideoProviderProps) => {
  const values = useVideo(debug);

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
