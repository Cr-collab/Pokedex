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
import { api } from "../services/api";

interface GetPokemonsContextProps {
  dataPokemons: DataPokemon;
  offset: number;
  getPokemons: (number) => void;
  getPokemon: (pokemon: string ) => void;
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

interface result {
  name: string;
  url: string;
}

export function GetPokemonsProvider({ children }: GetPokemonsProviderProps) {

  const [dataPokemons, setDataPokemons] = useState<DataPokemon>();
  const [offset, setOffset] = useState<number>(0);
  const [loading , setLoading] = useState<boolean>(false);

  async function getPokemons(offset: number = 0) {
    setLoading(false)
    let { data } = await api.get(`v2/pokemon/?limit=20&offset=${offset}`);
    let results: result[] = data.results;
    let pokemons = [];

   

    for await (const result of results) {
      let response = await api.get(`${result.url}`);

      let image = "";
      if (response.data.sprites.other["official-artwork"].front_default === null) {
        image = "/assets/poke.png";
      } else {
        image = response.data.sprites.other["official-artwork"].front_default;
      }
      pokemons.push({
        name: result.name[0].toUpperCase() + result.name.slice(1),
        img: image,
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
    setLoading(true)
  }

  async function getPokemon(pokemon: string ) {
    setLoading(false)
    try {

      let { data } = await api.get(`v2/pokemon/${pokemon.toLocaleLowerCase()}`);
      let pokemons = [];
  
      let image = "";
      if (data.sprites.other["official-artwork"].front_default === null) {
        image = "/assets/poke.png";
      } else {
        image = data.sprites.other["official-artwork"].front_default;
      }
        pokemons.push({
          name: data.name[0].toUpperCase() + data.name.slice(1),
          img: image,
          types: data.types,
          id: data.id,
        });
    
      setDataPokemons({
        count: 0,
        next: "",
        pokemons: pokemons,
        previous: "",
      });
  
    }catch (e) {
        toast('Pokemon not found')
    }
    setLoading(true);
  }






  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <GetPokemonsContext.Provider
      value={{ dataPokemons, getPokemons, getPokemon,offset, setOffset , loading}}
    >
      {children}
    </GetPokemonsContext.Provider>
  );
}

export function useGetPokemons() {
  const context = useContext(GetPokemonsContext);
  return context;
}
