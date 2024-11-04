import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getStaticAsset } from 'utils/utils';

const Socials2 = () => {
  const model = useLoader(GLTFLoader, getStaticAsset("/models/bin-2.glb"));

  let mixer: THREE.AnimationMixer;

  const handleClick = () => {
    if (model.animations.length) {
      mixer = new THREE.AnimationMixer(model.scene);
      model.animations.forEach((clip) => {
        mixer.setTime(37);
        const action = mixer.clipAction(clip);
        action.play();
      });
    }
  };

  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  return (
    <group onClick={handleClick} scale={[0.1, 0.1, 0.1]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default Socials2;
