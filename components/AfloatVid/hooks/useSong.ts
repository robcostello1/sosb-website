import { on } from "events";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

import { useFrame } from "@react-three/fiber";

import { calculateBars } from "./utils";

const BPM = 123;
const START_OFFSET = 0.401;

export type UseSongReturnType = {
  songRef: MutableRefObject<HTMLAudioElement | null>;
  analyserRef: MutableRefObject<AnalyserNode | null>;
  barRef: MutableRefObject<number>;
  handlePlay: () => void;
};

export const useSong = (): UseSongReturnType => {
  const songRef = useRef<HTMLAudioElement>(new Audio());
  const analyserRef = useRef<AnalyserNode | null>(null);
  const barRef = useRef(0);
  const audioCtx = useRef<AudioContext>();

  useEffect(() => {
    songRef.current.src = "/sound/afloat-full.mp3";
    audioCtx.current = new window.AudioContext();
    let audioSource = null;

    audioSource = audioCtx.current.createMediaElementSource(songRef.current);
    analyserRef.current = audioCtx.current.createAnalyser();
    audioSource.connect(analyserRef.current);
    analyserRef.current.connect(audioCtx.current.destination);
    analyserRef.current.fftSize = 128;

    const song = songRef.current;
    return () => {
      song.pause();
    };
  }, []);

  useFrame(() => {
    barRef.current = calculateBars(
      songRef.current.currentTime || 0,
      BPM,
      START_OFFSET
    );
  });

  const handlePlay = useCallback(() => {
    audioCtx.current?.resume();
    songRef.current.play();
  }, []);

  return { songRef, analyserRef, barRef, handlePlay };
};
