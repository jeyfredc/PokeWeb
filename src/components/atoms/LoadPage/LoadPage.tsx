
import styles from './LoadPage.module.css'
import Pokeball from '../../../assets/Icons/pokeball.svg?react'
const LoadPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <Pokeball className={styles.pokeball} aria-label="Pokéball" />
            <div className={styles.loading}>Cargando...</div>
        </div>
    </div>
  )
}

export default LoadPage