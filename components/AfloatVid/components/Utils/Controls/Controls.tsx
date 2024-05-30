import classNames from 'classnames';
import { useState } from 'react';
import { RiFullscreenExitFill, RiFullscreenFill, RiInformationLine } from 'react-icons/ri';

import About from './About';
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
  const [aboutShown, setAboutShown] = useState(false);

  return (
    <>
      <div className={classNames(styles.section, styles.sectionLeft)}>
        <div
          className={styles.control}
          onClick={() => setAboutShown(!aboutShown)}
        >
          <RiInformationLine size={32} aria-label="About" />
        </div>
      </div>

      <div className={classNames(styles.section, styles.sectionRight)}>
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
            <RiFullscreenFill size={32} aria-label="Make fullscreen" />
          ) : (
            <RiFullscreenExitFill size={32} aria-label="Leave fullscreen" />
          )}
        </div>
      </div>

      <About show={aboutShown} onHide={() => setAboutShown(false)} />
    </>
  );
};

export default Controls;
