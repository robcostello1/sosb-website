import { useEffect, useRef } from "react";
import Wad from "web-audio-daw";

export type SoundConfig = Omit<ConstructorParameters<typeof Wad>[0], "source">;

type SoundsProps = {
  initSoundConfig: readonly (SoundConfig & {
    key: string;
    source: string;
  })[];
  soundAdjustments: { [key: string]: SoundConfig };
};

type SoundsObj = Record<string, any>;

const Sounds = ({ initSoundConfig, soundAdjustments }: SoundsProps) => {
  const sounds = useRef<SoundsObj>({});

  useEffect(() => {
    Object.values(sounds.current).forEach((sound) => sound.stop());

    sounds.current = initSoundConfig.reduce((acc, { key, source, ...args }) => {
      return {
        ...acc,
        [key]: new Wad({
          // @ts-ignore
          source,
          loop: true,
          env: { hold: 99999 },
          ...args,
        }),
      };
    }, {} as SoundsObj);

    Object.values(sounds.current).forEach((sound) => sound.play());

    return () => {
      Object.values(sounds.current).forEach((sound) => sound.stop());
    };
  }, [initSoundConfig]);

  useEffect(() => {
    Object.entries(soundAdjustments).forEach(([key, { volume }]) => {
      sounds.current[key].setVolume(volume);
      // TODO not working
      // if (sounds.current[key].filter) {
      //   sounds.current[key].filter[0] = filter;
      // }
    });
  }, [soundAdjustments]);

  return <></>;
};

export default Sounds;
