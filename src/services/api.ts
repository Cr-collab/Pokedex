import axios from "axios";
import { toast } from "react-toastify";
import typeId from "../utils/typeId";

interface result {
  name: string;
  url: string;
}

type Weaknesses = {
  name: string;
};


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

interface Info {
  name: string;
  img: string;
  types: Type[];
  id: string;
  height: number;
  weight: number;
  ability: string;
  description: string;
  weaknesses: Weaknesses[];
}

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/",
});

export async function getPokemons(offset: number = 0): Promise<DataPokemon> {
  let { data } = await api.get(`v2/pokemon/?limit=20&offset=${offset}`);
  let results: result[] = data.results;
  let pokemons = [];

  for await (const result of results) {
    let response = await api.get(`${result.url}`);

    let image = "";
    if (
      response.data.sprites.other["official-artwork"].front_default === null
    ) {
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

  return {
    count: data.count,
    next: data.next,
    pokemons: pokemons,
    previous: data.previous,
  };
}

export async function getPokemon(pokemon: string): Promise<DataPokemon> {
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

  return {
    count: 0,
    next: "",
    pokemons: pokemons,
    previous: "",
  };
}

export async function informationPokemonAll(id) : Promise<Info>{
  let { data } = await api.get(`v2/pokemon/${id}`);

  let description = "";
  let image = "";
  
  try {

    let { data: dataDescription } = await api.get(`v2/pokemon-species/${id}`);
    description = dataDescription.flavor_text_entries.filter((value) => {
      return value.language.name === "en";
    })[0].flavor_text;

  } catch (error) {

    description = "Description not provided by pokemon api.";

  }

  let { data: dataWeaknesses } = await api.get(
    `v2/type/${typeId[data.types[0].type.name]}`
  );

  let weaknesses = dataWeaknesses.damage_relations.double_damage_from;


  if (data.sprites.other["official-artwork"].front_default === null) {
    image = "/assets/poke.png";
  } else {
    image = data.sprites.other["official-artwork"].front_default;
  }

  let info: Info = {
    name: data.name[0].toUpperCase() + data.name.slice(1),
    img: image,
    types: data.types,
    id: String(data.id).padStart(3, "0"),
    height: data.height / 10,
    weight: data.weight / 10,
    ability: data.abilities[0].ability.name,
    description: description,
    weaknesses: weaknesses,
  };

  return info
}
