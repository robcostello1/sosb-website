type Socials2Props = {};

import { useFrame, useLoader } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Socials2 = () => {
  const model = useLoader(GLTFLoader, "/models/bin-2.glb");

  // Here's the animation part
  // *************************
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
    <group onClick={handleClick}>
      <primitive object={model.scene} />
    </group>
  );
};

export default Socials2;
