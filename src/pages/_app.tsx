import "../../styles/global.scss";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { GetPokemonsProvider } from "../hooks/useGetPokemons";

function MyApp({ Component, pageProps }) {
  return (
    <GetPokemonsProvider>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </GetPokemonsProvider>
  );
}

export default MyApp;
