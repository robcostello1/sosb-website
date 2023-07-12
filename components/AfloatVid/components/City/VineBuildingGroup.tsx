import { Fragment, memo, useMemo } from 'react';

import BuildingWithVines from './BuildingWithVines';
import { TextureProps } from './types';

type VineBuildingGroupProps = {
  debug?: boolean;
  size: number;
  textureProps: TextureProps[];
};

const VineBuildingGroup = ({
  debug,
  textureProps,
  size,
}: VineBuildingGroupProps) => {
  const buildings = useMemo(() => {
    const buildingArray = [];

    if (!debug) {
      for (let index = 0; index < 10; index++) {
        buildingArray.push(
          <Fragment key={index}>
            {[1, -1].map((item) => {
              const x = (20 + Math.random() * 300) * item;
              const y = 0;
              const z = -Math.random() * size + size / 2;

              return (
                <BuildingWithVines
                  key={`vines-${index}-${item + 1}`}
                  scale={[
                    0.3 + Math.random(),
                    0.3 + Math.sqrt(Math.random() / Math.max(z, 0.1)),
                    0.3 + Math.random(),
                  ]}
                  vinesAmount={Math.random() / 4}
                  position={[x, y, z]}
                  pulsate={Math.random() / 4}
                  textureProps={
                    textureProps[
                      Math.floor(Math.random() * textureProps.length)
                    ]
                  }
                />
              );
            })}
          </Fragment>
        );
      }
    }
    return buildingArray;
  }, [debug, size, textureProps]);

  return <>{buildings}</>;
};

export default memo(VineBuildingGroup);
