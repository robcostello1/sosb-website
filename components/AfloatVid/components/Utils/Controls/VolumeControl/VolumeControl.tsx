import classnames from 'classnames';
import { useMemo } from 'react';
import { FaVolumeDown, FaVolumeOff, FaVolumeUp } from 'react-icons/fa';

import styles from './VolumeControl.module.css';

type VolumeControlProps = {
  volume: number;
  className?: string;
  onChangeVolume: (volume: number) => void;
};

const VolumeControl = ({
  volume,
  className,
  onChangeVolume,
}: VolumeControlProps) => {
  const volumeIcon = useMemo(() => {
    const props = {
      className: styles.volumeIcon,
      onClick: () => onChangeVolume(volume < 10 ? 100 : 0),
    };

    if (volume === 0) {
      return <FaVolumeOff {...props} />;
    }

    if (volume < 60) {
      return <FaVolumeDown {...props} />;
    }

    return <FaVolumeUp {...props} />;
  }, [volume, onChangeVolume]);

  return (
    <div className={classnames(styles.root, className)}>
      <input
        step={5}
        value={`${volume}`}
        onChange={({ target: { value } }) => onChangeVolume(parseFloat(value))}
        type="range"
        className={styles.volumeRange}
      />
      {volumeIcon}
    </div>
  );
};

export default VolumeControl;
