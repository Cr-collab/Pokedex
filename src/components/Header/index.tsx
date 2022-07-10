import styles from './styles.module.scss';
export function Header(){
  return(
    <header className={styles.containerHeader}>
      <div>
        <h1>Pokédex</h1>
      </div>
    </header>
  )
}