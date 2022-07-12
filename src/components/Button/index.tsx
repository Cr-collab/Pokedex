import { useRouter } from 'next/router'
import { useGetPokemons } from '../../hooks/useGetPokemons'
import styles from './styles.module.scss'
export function Button(){
  
  const {getPokemons} = useGetPokemons()

  const router = useRouter()

   function explorer(){
    router.push("/")
    getPokemons(0)
   }
  return(
    <button 
    onClick={() => explorer() }
    className={styles.button}>
      Explorar mais Pokémon
    </button>
  )
}