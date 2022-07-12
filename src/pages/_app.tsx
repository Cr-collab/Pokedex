import "../../styles/global.scss";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { GetPokemonsProvider } from "../hooks/useGetPokemons";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <GetPokemonsProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </GetPokemonsProvider>
  );
}

export default MyApp;
