import { memo } from 'react';

import { GroupProps } from '@react-three/fiber';

const Bus = (props: GroupProps) => {
  return <group {...props}></group>;
};

export default memo(Bus);
