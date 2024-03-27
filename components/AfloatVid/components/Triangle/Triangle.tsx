import { forwardRef, useMemo } from "react";
import { Color, DoubleSide, Mesh, Vector3 } from "three";

import { MeshProps } from "@react-three/fiber";

type TriangleProps = {
  vertices: [Vector3, Vector3, Vector3];
  color: Color;
} & MeshProps;

// TODO: move
const Triangle = forwardRef<Mesh, TriangleProps>(
  ({ vertices, color, ...props }, ref) => {
    const verticesMemo = useMemo(() => {
      const verticesArray: number[] = [];

      vertices.forEach((vertex) => [...verticesArray, ...vertex.toArray()]);

      return Float32Array.from(verticesArray);
    }, [vertices]);

    return (
      <mesh ref={ref} {...props}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            // @ts-expect-error
            attachObject={["attributes", "position"]}
            args={[verticesMemo, 3]}
          />
        </bufferGeometry>
        <meshBasicMaterial attach="material" color={color} side={DoubleSide} />
      </mesh>
    );
  }
);

export default Triangle;
