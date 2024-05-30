import { forwardRef, useMemo } from "react";
import { Color, DoubleSide, Mesh, Vector3 } from "three";

import { Box } from "@react-three/drei";
import { GroupProps, MeshProps } from "@react-three/fiber";

type TriangleProps = {
  color: Color;
} & GroupProps;

const Triangle = forwardRef<Mesh, TriangleProps>(({ color, ...props }, ref) => {
  const vertices = new Float32Array([
    // 1st triangle
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,
    // 3nd triangle
    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
  ]);

  return (
    <group {...props}>
      <mesh ref={ref} rotation={[0, 0, -Math.PI / 4]}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={vertices}
            itemSize={3}
            count={3}
          />
        </bufferGeometry>
        <meshBasicMaterial attach="material" color={color} side={DoubleSide} />
      </mesh>
    </group>
  );
});

// TODO: move
// const Triangle = forwardRef<Mesh, TriangleProps>(
//   ({ vertices, color, ...props }, ref) => {
//     const verticesMemo = useMemo(() => {
//       const verticesArray: number[] = [];

//       vertices.forEach((vertex) => [...verticesArray, ...vertex.toArray()]);

//       return Float32Array.from(verticesArray);
//     }, [vertices]);

//     return (
//       <mesh ref={ref} {...props}>
//         <bufferGeometry attach="geometry">
//           <bufferAttribute
//             // @ts-expect-error
//             attachObject={["attributes", "position"]}
//             args={[verticesMemo, 3]}
//           />
//         </bufferGeometry>
//         <meshBasicMaterial
//           attach="material"
//           color={color}
//           side={DoubleSide}
//           wireframe
//         />
//       </mesh>
//     );
//   }
// );

export default Triangle;
