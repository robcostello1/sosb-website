import { memo, useEffect } from 'react';
import Wad from 'web-audio-daw';
import WadType from 'web-audio-daw/types/wad';
import { SFXProps } from './types';

const sounds: Record<string, WadType> = {
  bin1: new Wad({
    // @ts-ignore can take sound file path
    source: "/sound/bin1.mp3",
  }),
  bin2: new Wad({
    // @ts-ignore
    source: "/sound/bin2.mp3",
  }),
};

const SFX = ({ current }: SFXProps) => {
  useEffect(() => {
    if (current) {
      sounds[current]?.play();
    }
  }, [current]);

  return <></>;
};

export default memo(SFX);
