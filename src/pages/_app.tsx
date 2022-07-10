import "../../styles/global.scss";
import { Header } from "../components/Header";
import { GetPokemonsProvider } from "../hooks/useGetPokemons";

function MyApp({ Component, pageProps }) {
  return (
    <GetPokemonsProvider>
      <Header />
      <Component {...pageProps} />
    </GetPokemonsProvider>
  );
}

export default MyApp;
