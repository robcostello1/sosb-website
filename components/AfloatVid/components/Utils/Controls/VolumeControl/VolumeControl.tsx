import classnames from 'classnames';
import { useMemo } from 'react';
import { RiVolumeDownLine, RiVolumeMuteLine, RiVolumeUpLine } from 'react-icons/ri';

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
      "aria-label": "Volume",
      className: styles.volumeIcon,
      onClick: () => onChangeVolume(volume < 10 ? 100 : 0),
    };

    if (volume === 0) {
      return <RiVolumeMuteLine {...props} />;
    }

    if (volume < 60) {
      return <RiVolumeDownLine {...props} />;
    }

    return <RiVolumeUpLine {...props} />;
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
