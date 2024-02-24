import { useContext } from "react";

import { VideoContext } from "./context";

export const useVideoContext = () => {
  return useContext(VideoContext);
};
