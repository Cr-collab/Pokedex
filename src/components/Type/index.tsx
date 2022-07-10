import { linearGradient } from "polished";
import { Styles } from "polished/lib/types/style";
import { boxTypeStyle } from "../../utils/boxTypeStyle";
import { typesColor } from "../../utils/types";
import styles from "./styles.module.scss";

type TypeProps = {
  slot: number;
  type: {
    name: string;
  };
};

export function Type({ type }: TypeProps) {
  let isGradient =
    type.name === "dragon" || type.name === "ground" || type.name === "flying";

  return (
    <div
      className={styles.container}
      style={boxTypeStyle({ isGradient, type })}
    >
      {type.name}
    </div>
  );
}
