import styles from "./styles.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../services/api";
import { useGetPokemons } from "../../hooks/useGetPokemons";

export function SearchPokemons() {
  const { getPokemon} = useGetPokemons();
  const [search, setSearch] = useState('');

  async function handleSearchPokemon(){
      getPokemon(search)  
      setSearch('');
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.searchContainerBox}>
          <p>Nome ou número </p>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />{" "}
          <button onClick={handleSearchPokemon}>
            {" "}
            <RiSearchLine size={20} />{" "}
          </button>
        
        </div>

        <div className={styles.containerMns}>
          <p>
            {" "}
            Realize a busca por Pokémon pelo nome ou usando o número do Pokédex
            Nacional.
          </p>
        </div>
      </div>
    </div>
  );
}
