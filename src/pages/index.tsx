import { useEffect, useState } from "react";
import CardPokemon from "../components/CardPokemon";
import { Footer } from "../components/Footer";
import { Pagination } from "../components/Pagination";
import { SearchPokemons } from "../components/SearchPokemons";
import { useGetPokemons } from "../hooks/useGetPokemons";

import styles from "./home.module.scss";

export default function Home() {
  const { dataPokemons ,getPokemons, offset, setOffset} = useGetPokemons();
  

  return (
    <main className={styles.main}>
      <SearchPokemons />
      <div className={styles.container}>
        {dataPokemons?.pokemons?.map((pokemon) => (
          <CardPokemon pokemon={pokemon} key={pokemon.name} />
        ))}
       
      </div>
      <Pagination
          limit={20}
          offset={offset}
          setOffset={setOffset}
          getPokemons={getPokemons}
          totalItens={dataPokemons?.count}
        />

        <Footer/>
    </main>
  );
}


