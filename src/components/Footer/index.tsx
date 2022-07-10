import styles from './styles.module.scss'
export function Footer(){
  return(
    <div className={styles.conatiner}> 
        <div>
          <p> The Pokémon Company </p>
          <ul>
            <li>- Novidades</li>
            <li>- Guia Pokémon</li>
            <li>- Serviço ao Consumidor </li>
            <li>- Sobre nossa Empresa</li>
            <li>- Selecione um País uma Região</li>
            <li>- Pókemon site de imprensa </li>
          </ul>
        </div>
    </div>
  )
}