import { memo } from 'react';

import ScreenContents from '../../City/Screen/ScreenContents';
import FridgeContents from '../../Fridge';
import FloatingStuff from '../FloatingStuff';

type FloatingSceneProps = {
  visible: boolean;
};

const SCREEN_SCALE = 0.003;
const screen = (
  <ScreenContents
    boxArgs={[718 * SCREEN_SCALE, 404 * SCREEN_SCALE, 0.1]}
    videoOffset={[0, 0.2]}
    videoScale={1}
    start={true}
  />
);
const fridge = <FridgeContents />;

const FloatingScene = ({ visible }: FloatingSceneProps) => {
  return (
    <FloatingStuff
      numberOfItems={100}
      from={-100}
      to={1200}
      duration={240}
      delay={0}
      visible={visible}
    >
      {screen}
      {fridge}
    </FloatingStuff>
  );
};

export default memo(FloatingScene);
