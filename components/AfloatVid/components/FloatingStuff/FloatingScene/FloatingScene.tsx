import ScreenContents from '../../City/Screen/ScreenContents';
import FloatingStuff from '../FloatingStuff';

type FloatingSceneProps = {
  visible: boolean;
};

const FloatingScene = ({ visible }: FloatingSceneProps) => {
  return (
    <FloatingStuff
      numberOfItems={100}
      from={-100}
      to={1000}
      duration={300}
      delay={0}
      visible={visible}
    >
      <ScreenContents
        // TODO temp
        url={"/maps/verse1.mp4"}
        boxArgs={[3, 1, 0.1]}
        videoOffset={[0, 0.2]}
        videoScale={1}
        // TODO align with song
        start={true}
      />
    </FloatingStuff>
  );
};

export default FloatingScene;