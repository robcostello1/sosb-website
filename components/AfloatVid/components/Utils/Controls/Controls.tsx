import { RiFullscreenExitFill, RiFullscreenFill } from 'react-icons/ri';

import styles from './Controls.module.css';
import VolumeControl from './VolumeControl';

export type ControlsProps = {
  volume: number;
  fullscreen: boolean;
  onChangeVolume: (volume: number) => void;
  onChangeFullscreen: (fullscreen: boolean) => void;
};

const Controls = ({
  volume,
  fullscreen,
  onChangeVolume,
  onChangeFullscreen,
}: ControlsProps) => {
  return (
    <div className={styles.root}>
      <VolumeControl
        className={styles.control}
        volume={volume}
        onChangeVolume={onChangeVolume}
      />

      <div
        className={styles.control}
        onClick={() => onChangeFullscreen(!fullscreen)}
      >
        {!fullscreen ? (
          <RiFullscreenFill size={32} />
        ) : (
          <RiFullscreenExitFill size={32} />
        )}
      </div>
    </div>
  );
};

export default Controls;
