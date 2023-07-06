import { memo, useEffect } from 'react';
import Wad from 'web-audio-daw';

export type SoundConfig = Omit<ConstructorParameters<typeof Wad>[0], "source">;

const sounds = {
  bin1: new Wad({
    // @ts-ignore
    source: "/sound/bin1.mp3",
  }),
  bin2: new Wad({
    // @ts-ignore
    source: "/sound/bin2.mp3",
  }),
};

export type SFXProps = {
  current?: keyof typeof sounds;
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
