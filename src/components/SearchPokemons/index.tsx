import { useState } from "react";
import { useGetPokemons } from "../../hooks/useGetPokemons";

import styles from "./styles.module.scss";

import { RiSearchLine } from "react-icons/ri";

export function SearchPokemons() {
  const { handleDataPokemon } = useGetPokemons();
  const [search, setSearch] = useState("");

  async function handleSearchPokemon() {
    handleDataPokemon(search);
    setSearch("");
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.searchContainerBox}>
          <p>Nome ou número </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearchPokemon}>
            <RiSearchLine size={20} />
          </button>
        </div>

        <div className={styles.containerMns}>
          <p>
            Realize a busca por Pokémon pelo nome ou usando o número do Pokédex
            Nacional.
          </p>
        </div>
      </div>
    </div>
  );
}
