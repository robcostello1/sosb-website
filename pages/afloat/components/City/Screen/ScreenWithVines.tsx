import { GroupProps } from "@react-three/fiber";
import { Vines } from "..";
import Screen, { ScreenProps } from "./Screen";

const ScreenWithVines = ({
  position,
  rotation,
  boxArgs,
  ...screenProps
}: Pick<GroupProps, "position" | "rotation"> & ScreenProps) => {
  return (
    <group position={position} rotation={rotation}>
      <Vines
        geometryDimensions={boxArgs}
        vinesAmount={1}
        includeSides={false}
      />
      <Screen boxArgs={boxArgs} {...screenProps} />
    </group>
  );
};

export default ScreenWithVines;
