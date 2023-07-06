import { memo, useMemo } from 'react';

import TowerBlock from '../../../City/TowerBlock';

const City = () => {
  const material = useMemo(() => {
    const lightness = 0.05;

    return (
      <meshStandardMaterial
        color={[lightness, lightness, lightness]}
        roughness={1}
        metalness={0}
      />
    );
  }, []);

  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((distance) =>
        [1, -1].map((side) => (
          <TowerBlock
            key={`${side}-${distance}`}
            stories={20}
            windowStrutCount={7}
            wallWindowMatrix={[1, 1, 0.1]}
            wallMaterial={material}
            scale={[19, 4, 19]}
            position={[
              20 * side,
              -3 - Math.floor(Math.random() * 20) * 4,
              -20 * distance,
            ]}
          />
        ))
      )}
    </>
  );
};

export default memo(City);
