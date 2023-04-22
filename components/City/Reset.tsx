import { Triplet } from "../../utils/types";
import Button from "../Button";

const Reset = ({
  position,
  onClick,
}: {
  position?: Triplet;
  onClick: () => void;
}) => <Button position={position} onClick={onClick} text={"Reset"} />;

export default Reset;
