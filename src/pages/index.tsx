import { useRouter } from "next/router";
import { Button } from "../components/Button";
import CardPokemon from "../components/CardPokemon";
import { Pagination } from "../components/Pagination";
import { SearchPokemons } from "../components/SearchPokemons";
import { useGetPokemons } from "../hooks/useGetPokemons";

import styles from "./home.module.scss";

export default function Home() {
  const { dataPokemons ,getPokemons, offset, setOffset} = useGetPokemons();
  const router = useRouter()

  return (
    <main className={styles.main}>
      <SearchPokemons />
      <div className={styles.container}>
        
        {dataPokemons?.pokemons?.map((pokemon) => (
          <CardPokemon  pokemon={pokemon} key={pokemon.name} />
        ))}
       
      </div>
       {
        dataPokemons?.count !== 0 && (
          <Pagination
          limit={20}
          offset={offset}
          setOffset={setOffset}
          getPokemons={getPokemons}
          totalItens={dataPokemons?.count}
        />
        )
       }

       {
        dataPokemons?.pokemons.length === 1 && (
          <Button/>
        )
       }

    </main>
  );
}


