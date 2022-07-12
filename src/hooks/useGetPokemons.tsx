import {
  useEffect,
  ReactNode,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "react-toastify";

import { getPokemon, getPokemons } from "../services/api";

interface GetPokemonsContextProps {
  dataPokemons: DataPokemon;
  offset: number;
  storeDataAll: (number) => void;
  handleDataPokemon: (pokemon: string) => void;
  setOffset: Dispatch<SetStateAction<number>>;
  loading: boolean;
}

type Type = {
  slot: number;
  type: {
    name: string;
  };
};

type Pokemons = {
  name: string;
  img: string;
  id: number;
  types: Type[];
};

type DataPokemon = {
  count: number;
  next: string;
  previous: string;
  pokemons: Pokemons[];
};

const GetPokemonsContext = createContext<GetPokemonsContextProps>(
  {} as GetPokemonsContextProps
);

interface GetPokemonsProviderProps {
  children: ReactNode;
}

export function GetPokemonsProvider({ children }: GetPokemonsProviderProps) {
  const [dataPokemons, setDataPokemons] = useState<DataPokemon>();
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function storeDataAll(offset: number) {
    setLoading(false);
    try {
      let pokemons = await getPokemons(offset);
      setDataPokemons(pokemons);
    } catch (e) {
      toast("Api not found");
    }
    setLoading(true);
  }

  async function handleDataPokemon(pokemon: string) {
    setLoading(false);
    try {
      let pokemonData = await getPokemon(pokemon);
      setDataPokemons(pokemonData);
    } catch (e) {
      toast("Pokemon not found");
    }
    setLoading(true);
  }

  useEffect(() => {
    storeDataAll(0);
  }, []);

  return (
    <GetPokemonsContext.Provider
      value={{
        dataPokemons,
        handleDataPokemon,
        storeDataAll,
        offset,
        setOffset,
        loading,
      }}
    >
      {children}
    </GetPokemonsContext.Provider>
  );
}

export function useGetPokemons() {
  const context = useContext(GetPokemonsContext);
  return context;
}
