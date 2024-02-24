import { useCallback, useRef, useState } from 'react';
import { Euler, Vector3 } from 'three';

import { useVideoContext } from '../../../Video';
import BaseBuilding, { BaseBuildingProps, OnFrameFunc } from '../../BaseBuilding';
import { DEFAULT_BUILDING_HEIGHT } from '../../consts';

type GlitchBuildingProps = Omit<BaseBuildingProps, "scale">;

const POSITION_OFFSET = 8;

const getScale = () =>
  new Vector3(
    0.5 + Math.random(),
    0.5 + Math.random() * 3,
    0.5 + Math.random()
  );

const getPosition = (scaleY: number) =>
  new Vector3(0, -(scaleY * DEFAULT_BUILDING_HEIGHT) / 2 - POSITION_OFFSET, 0);

const getTiming = () => 4;

const getRotation = () =>
  new Euler(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);

const GlitchBuilding = ({
  textureProps,
  visible,
  ...props
}: GlitchBuildingProps) => {
  const { barRef } = useVideoContext();
  const initScale = getScale();
  const [rotation, setRotation] = useState(getRotation());
  const [scale, setScale] = useState(initScale);
  const [position, setPosition] = useState(getPosition(initScale.y));
  const [timing, setTiming] = useState(getTiming());

  const lastBarRef = useRef(barRef.current);

  const handleResize = useCallback<OnFrameFunc>(
    ({ mesh, light }) => {
      if (
        visible &&
        barRef.current > 0 &&
        barRef.current !== lastBarRef.current &&
        (barRef.current * 2 + 1) % timing === 0
      ) {
        [mesh, light].forEach((obj) => {
          if (obj) {
            const increase = DEFAULT_BUILDING_HEIGHT * (scale.y / 4);
            const time = (60 / 123 / 2) * 1000;

            obj.position.y += increase;
            obj.visible = true;
            setTimeout(() => {
              obj.position.y += increase;
            }, time);
            setTimeout(() => {
              obj.position.y += increase;
            }, time * 2);
            setTimeout(() => {
              obj.position.y += increase;
            }, time * 3);

            setTimeout(() => {
              obj.visible = false;
              const newScale = getScale();
              setScale(newScale);
              setPosition(getPosition(newScale.y));
              setRotation(getRotation());
              setTiming(getTiming());
            }, time * 4);
          }
        });
        lastBarRef.current = barRef.current;
      }
    },
    [visible, barRef, timing, scale.y]
  );

  return (
    <group {...props} rotation={rotation}>
      <BaseBuilding
        visible={false}
        onFrame={handleResize}
        scale={scale}
        position={position}
        textureProps={textureProps}
      />
    </group>
  );
};

export default GlitchBuilding;
