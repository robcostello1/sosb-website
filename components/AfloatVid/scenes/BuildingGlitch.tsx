import { memo } from 'react';

import { Building } from '../components/LegacyCity';
import { useBar } from '../hooks';

const RandomBuilding = () => (
  <Building
    scale={[Math.random() * 30, Math.random() * 30, Math.random() * 30]}
    position={[
      Math.random() * 100 - 50,
      Math.random() * 100 - 50,
      Math.random() * -60 - 10,
    ]}
    rotation={[0, Math.random() * Math.PI, 0]}
  />
);

const BuildingGlitch = () => {
  const bar = useBar();

  return bar % 4 === 1 ? (
    <>
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
      <RandomBuilding />
    </>
  ) : null;
};

export default memo(BuildingGlitch);
