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

export const useVideo = (
  videoUrl = "videos/main.mp4",
  debug?: boolean
): UseVideoReturnType => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const mediaRef = useRef<HTMLVideoElement>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const barRef = useRef(0);
  const audioCtx = useRef<AudioContext>();

  useEffect(() => {
    mediaRef.current = document.createElement("video");
    const video = mediaRef.current;
    video.setAttribute("src", videoUrl);
    video.setAttribute("style", "position: fixed; visibility: hidden");
    video.setAttribute("playsinline", "true");

    document.body.appendChild(video);

    const AudioContext =
      window.AudioContext ||
      // @ts-expect-error
      window.webkitAudioContext || // Safari and old versions of Chrome
      false;

    if (AudioContext) {
      audioCtx.current = new AudioContext();
    } else {
      alert(
        "Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox"
      );
      return;
    }

    let audioSource = null;

    audioSource = audioCtx.current.createMediaElementSource(video);
    analyserRef.current = audioCtx.current.createAnalyser();

    // Fixes missing method in Safari
    // https://stackoverflow.com/questions/54182324/analyser-getfloattimedomaindata-does-not-exist-in-safari
    if (analyserRef.current && !analyserRef.current.getFloatTimeDomainData) {
      var r = new Uint8Array(2048);
      analyserRef.current.getFloatTimeDomainData = function (e) {
        analyserRef.current!.getByteTimeDomainData(r);
        for (var t = 0, o = e.length; o > t; t++)
          e[t] = 0.0078125 * (r[t] - 128);
      };
    }

    audioSource.connect(analyserRef.current);
    analyserRef.current.connect(audioCtx.current.destination);
    analyserRef.current.fftSize = 128;

    setMediaLoaded(true);

    return () => {
      video.pause();
    };
  }, [videoUrl]);

  useFrame(({ clock: { elapsedTime } }) => {
    barRef.current = calculateBars(
      mediaRef.current?.currentTime || 0,
      BPM,
      START_OFFSET
    );

    if (mediaRef.current && debug && Math.floor(elapsedTime) % 10 === 0) {
      mediaRef.current.currentTime = 3 * 60;
    }
  });

  const handlePlay = useCallback(() => {
    audioCtx.current?.resume();
    mediaRef.current?.play();
  }, []);

  return { mediaRef, analyserRef, barRef, handlePlay, mediaLoaded };
};
