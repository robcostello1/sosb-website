import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { Mesh } from 'three';

import { MeshProps } from '@react-three/fiber';

const MeshWithAo = forwardRef((props: MeshProps, ref: ForwardedRef<Mesh>) => {
  const localRef = useRef<Mesh>(null);

  useEffect(() => {
    if (localRef.current) {
      localRef.current.geometry.attributes.uv2 =
        localRef.current.geometry.attributes.uv.clone();
    }
  }, [localRef]);

  return <mesh ref={mergeRefs([ref, localRef])} {...props} />;
});

export default MeshWithAo;
