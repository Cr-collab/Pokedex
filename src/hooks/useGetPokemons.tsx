import {
  useEffect,
  ReactNode,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { api } from "../services/api";

interface GetPokemonsContextProps {
  dataPokemons: DataPokemon;
  offset: number;
  getPokemons: (number) => void;
  setOffset: Dispatch<SetStateAction<number>>;
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

interface result {
  name: string;
  url: string;
}

export function GetPokemonsProvider({ children }: GetPokemonsProviderProps) {
  const [dataPokemons, setDataPokemons] = useState<DataPokemon>();
  const [offset, setOffset] = useState<number>(0);

  async function getPokemons(offset: number = 0) {
    let { data } = await api.get(`v2/pokemon/?limit=20&offset=${offset}`);
    let results: result[] = data.results;
    let pokemons = [];

    for await (const result of results) {
      let response = await api.get(`${result.url}`);
      pokemons.push({
        name: result.name[0].toUpperCase() + result.name.slice(1),
        img: response.data.sprites.other.dream_world.front_default,
        types: response.data.types,
        id: response.data.id,
      });
    }
    setDataPokemons({
      count: data.count,
      next: data.next,
      pokemons: pokemons,
      previous: data.previous,
    });
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <GetPokemonsContext.Provider
      value={{ dataPokemons, getPokemons, offset, setOffset }}
    >
      {children}
    </GetPokemonsContext.Provider>
  );
}

export function useGetPokemons() {
  const context = useContext(GetPokemonsContext);
  return context;
}
