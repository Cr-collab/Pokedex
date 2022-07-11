import { info } from "console";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useGetPokemons } from "../../hooks/useGetPokemons";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export default function InfoPokemon({info}) {
  console.log(info)
  return (
    <main className={styles.main}>
      <div>
        {/* <div className={styles.containerButton}>
          <button
            style={{
              borderRadius: "2rem 0rem 0rem 10rem",
            }}
          >
            <BsFillArrowLeftCircleFill size={30} className={styles.icon} />
            <span>Nº {905}</span>
            <p> Enamorus</p>
          </button>
          <button
            style={{
              borderRadius: "0rem 2rem 10rem 0rem",
            }}
          >
            <p> Ivysaur </p>
            <span> Nº 00{2} </span>
            <BsFillArrowRightCircleFill size={30} />
          </button>
        </div> */}
        <p className={styles.title}>{info?.name} Nº{info.id} </p>
        <div className={styles.containerInfo}>
          <img
            src={info.img}
            alt={info.name}
          />

          <div>
            <p>
              { info.description}
            </p>

            <div>
              <p>Altura : {parseFloat(info.height)} m</p>

              <p>peso : {info.weight} kg</p>

              <p>Habilidades : {info.abilities[0].ability.name}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  let { data  } = await api.get(`v2/pokemon/${id}`);
  let { data : dataDescription  } = await api.get(`v2/pokemon-species/${id}`);
   console.log()
  let info = {
    name: data.name[0].toUpperCase() + data.name.slice(1),
    img: data.sprites.other.dream_world.front_default,
    types: data.types,
    id: String(data.id).padStart(3, '0'),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities,
    description: dataDescription.flavor_text_entries[9].flavor_text
  };


  return {
    props: {
      info,
    },
  };
};
