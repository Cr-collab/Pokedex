import { useRouter } from "next/router";
import { Type } from "../Type";
import styles from "./styles.module.scss";

type Type = {
  slot: number;
  type: {
    name: string;
  };
};

interface CardPokemonProps {
  pokemon: {
    name: string;
    id: number;
    img: string;
    types: Type[];
  };
}

export default function CardPokemon({ pokemon }: CardPokemonProps) {
  const router = useRouter()
  console.log(pokemon.img)
  return (
    <div className={styles.container} onClick={() => router.push(`pokemon/${pokemon.id}`) }>
      <img src={pokemon.img} />

      <p className={styles.id}> Nº {String(pokemon.id).padStart(3, "0")} </p>

      <p className={styles.name}>{pokemon.name}</p>

      {pokemon.types.map(({ type, slot }) => (
        <Type type={type} slot={slot} key={slot} />
      ))}
    </div>
  );
}
