import { boxTypeStyle } from "../../utils/boxTypeStyle";
import styles from "./styles.module.scss";

type TypeProps = {
  height?: string;
  width?: string;
  slot?: number;
  lineHeight?: string;
  type: {
    name: string;
  };
};

export function Type({ type, height, width, lineHeight }: TypeProps) {
  let isGradient =
    type.name === "dragon" || type.name === "ground" || type.name === "flying";

  return (
    <div
      className={styles.container}
      style={boxTypeStyle({ isGradient, type, height, width, lineHeight })}
    >
      {type.name}
    </div>
  );
}
