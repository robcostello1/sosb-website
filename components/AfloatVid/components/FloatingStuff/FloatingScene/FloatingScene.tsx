import { useLoader } from '@react-three/fiber';

import ScreenContents from '../../City/Screen/ScreenContents';
import Fridge from '../../Fridge';
import FloatingStuff from '../FloatingStuff';

type FloatingSceneProps = {
  visible: boolean;
};

const screen = (
  <ScreenContents
    // TODO temp
    url={"/videos/verse1.mp4"}
    boxArgs={[3, 1, 0.1]}
    videoOffset={[0, 0.2]}
    videoScale={1}
    // TODO align with song
    start={true}
  />
);
const fridge = <Fridge />;

const FloatingScene = ({ visible }: FloatingSceneProps) => {
  return (
    <FloatingStuff
      numberOfItems={100}
      from={-100}
      to={2000}
      duration={240}
      delay={0}
      visible={visible}
    >
      {screen}
      {fridge}
    </FloatingStuff>
  );
};

export default FloatingScene;
