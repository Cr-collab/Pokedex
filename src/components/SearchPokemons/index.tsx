import styles from "./styles.module.scss";
import { RiSearchLine } from "react-icons/ri";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../../services/api";

export function SearchPokemons() {
 
  return (
    <div className={styles.container}>
      <div className={styles.containerBox}>
        <div className={styles.searchContainerBox}>
          <p>Nome ou número </p>
          <input type="text" />{" "}
          <button>
            {" "}
            <RiSearchLine size={20} />{" "}
          </button>
          <span>
            {" "}
            Use a pesquisa avançada para explorar Pokémon por tipo, fraqueza,
            habilidade e mais!{" "}
          </span>
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
