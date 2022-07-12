import { GetServerSideProps } from "next";

import { Button } from "../../components/Button";
import { InfoBox } from "../../components/InfoBox";
import { Type } from "../../components/Type";
import { useGetPokemons } from "../../hooks/useGetPokemons";
import { api } from "../../services/api";
import typeId from "../../utils/typeId";
import styles from "./styles.module.scss";

interface InfoPokemonProps {
  info: {
    name: string;
    img: string;
    types: Type[];
    id: string;
    height: number;
    weight: number;
    ability: string;
    description: string;
    weaknesses: Weaknesses[];
  };
}

type Type = {
  slot: number;
  type: {
    name: string;
  };
};

type Weaknesses = {
  name: string;
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

export default function InfoPokemon({ info }: InfoPokemonProps) {
  const {loading} =  useGetPokemons()
  return (
    <main className={styles.main}>
      {loading ? (
        <div>
          <p className={styles.title}>
            {info?.name} Nº{info.id}{" "}
          </p>
          <div className={styles.containerInfo}>
            <img src={info.img} alt={info.name} />

            <div>
              <p>{info.description}</p>

              <InfoBox
                ability={info.ability}
                height={info.height}
                weight={info.weight}
              />

              <div>
                <div className={styles.containerType}>
                  <p>Type</p>
                  {info.types.map((type) => (
                    <Type
                      type={type.type}
                      key={type.slot}
                      lineHeight="30px"
                      height="30px"
                      width="100px"
                    />
                  ))}
                </div>

                <div className={styles.containerType}>
                  <p>Weakness</p>
                  {info.weaknesses?.map((type, index) => (
                    <Type
                      type={type}
                      key={index}
                      lineHeight="30px"
                      height="30px"
                      width="100px"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Button />
        </div>
      ) : (
        <img width="100%" src="/assets/getting_ready.gif" />
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  let { data } = await api.get(`v2/pokemon/${id}`);
  let description = "";
  try {
    let { data: dataDescription } = await api.get(`v2/pokemon-species/${id}`);
    description = dataDescription.flavor_text_entries.filter((value) => {
      return value.language.name === "en";
    })[0].flavor_text;
  } catch (error) {
    description = "Description not provided by pokemon api.";
  }

  let { data: dataTypes } = await api.get(
    `v2/type/${typeId[data.types[0].type.name]}`
  );
  let weaknesses = dataTypes.damage_relations.double_damage_from;
  let image = "";
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

  return {
    props: {
      info,
    },
  };
};
