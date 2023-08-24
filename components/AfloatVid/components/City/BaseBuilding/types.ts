import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
} from "three";

export type OnFrameFunc = (props: {
  elapsedTime: number;
  light: Mesh<BoxGeometry, MeshBasicMaterial>;
  mesh: Mesh<BoxGeometry, MeshStandardMaterial>;
}) => void;
