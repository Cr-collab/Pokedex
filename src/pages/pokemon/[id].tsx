import { GetServerSideProps } from "next";

import { Button } from "../../components/Button";
import { InfoBox } from "../../components/InfoBox";
import { Loading } from "../../components/Loading";
import { Type } from "../../components/Type";
import { useGetPokemons } from "../../hooks/useGetPokemons";
import { informationPokemonAll } from "../../services/api";

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

export default function InfoPokemon({ info }: InfoPokemonProps) {
  const { loading } = useGetPokemons();
  return (
    <Loading isLoading={loading}>
      <main className={styles.main}>
        <p className={styles.title}>
          {info?.name} Nº{info.id}{" "}
        </p>
        <img src={info.img} alt={info.name} />

        <p className={styles.description}>{info.description}</p>

        <InfoBox
          ability={info.ability}
          height={info.height}
          weight={info.weight}
        />

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

        <div className={styles.containerWeakness}>
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
        <Button isExplorer={false} />
      </main>
    </Loading>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  const info = await informationPokemonAll(id);

  return {
    props: {
      info,
    },
  };
};
