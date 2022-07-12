import styles from "./styles.module.scss";

interface InfoBoxProps {
  height: number;
  weight: number;
  ability: string;
}
export function InfoBox({ ability, height, weight }: InfoBoxProps) {
  return (
    <div className={styles.container}>
      <p>Height</p>
      <span>{height} m</span>

      <p>Peso </p>
      <span>{weight} kg</span>

      <p>Abilities</p>
      <span>{ability}</span>
    </div>
  );
}
