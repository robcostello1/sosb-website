import { on } from 'events';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';

import { calculateBars } from '../../hooks/utils';

const BPM = 123;
const START_OFFSET = 0.401;

export type UseVideoReturnType = {
  mediaRef: MutableRefObject<HTMLVideoElement | undefined>;
  analyserRef: MutableRefObject<AnalyserNode | null>;
  barRef: MutableRefObject<number>;
  mediaLoaded: boolean;
  handlePlay: () => void;
};

export const useVideo = (): UseVideoReturnType => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const mediaRef = useRef<HTMLVideoElement>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const barRef = useRef(0);
  const audioCtx = useRef<AudioContext>();

  useEffect(() => {
    mediaRef.current = document.createElement("video");
    const video = mediaRef.current;
    video.setAttribute("src", "videos/main.mp4");
    video.setAttribute("style", "position: fixed; visibility: hidden");

    // TODO temp
    // video.setAttribute("loop", "true");

    document.body.appendChild(video);

    audioCtx.current = new window.AudioContext();
    let audioSource = null;

    audioSource = audioCtx.current.createMediaElementSource(video);
    analyserRef.current = audioCtx.current.createAnalyser();
    audioSource.connect(analyserRef.current);
    analyserRef.current.connect(audioCtx.current.destination);
    analyserRef.current.fftSize = 128;

    setMediaLoaded(true);

    return () => {
      video.pause();
    };
  }, []);

  useFrame(() => {
    barRef.current = calculateBars(
      mediaRef.current?.currentTime || 0,
      BPM,
      START_OFFSET
    );
  });

  const handlePlay = useCallback(() => {
    audioCtx.current?.resume();
    mediaRef.current?.play();
  }, []);

  return { mediaRef, analyserRef, barRef, handlePlay, mediaLoaded };
};
