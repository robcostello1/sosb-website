import Wad from 'web-audio-daw';

export type SoundConfig = Omit<ConstructorParameters<typeof Wad>[0], "source">;

export type SFXProps = {
  current?: string;
};