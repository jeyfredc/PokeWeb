import { usePokemonFilterStore } from '../../../store/slices/pokemonSlice'
import styles from './Menu.module.css'

interface MenuProps {
  isOpen: boolean
  onClose?: () => void
}

const Menu = ({ isOpen }: MenuProps) => {
  const { sortOrder, setSortOrder } = usePokemonFilterStore()

  const handleOptionChange = (order: 'number' | 'name' | 'favorites') => {
    setSortOrder(order)
  }

  return (
    <div className={`${styles.menuContainer} ${isOpen ? styles.menuOpen : ''}`}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Sort by:</h2>
      </div>
      <div className={styles.optionsContainer}>
        <label className={styles.option}>
          <input
            type="radio"
            name="sortOrder"
            value="number"
            checked={sortOrder === 'number'}
            onChange={() => handleOptionChange('number')}
            className={styles.radioInput}
          />
          <span className={styles.optionLabel}>Number</span>
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            name="sortOrder"
            value="name"
            checked={sortOrder === 'name'}
            onChange={() => handleOptionChange('name')}
            className={styles.radioInput}
          />
          <span className={styles.optionLabel}>Name</span>
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            name="sortOrder"
            value="favorites"
            checked={sortOrder === 'favorites'}
            onChange={() => handleOptionChange('favorites')}
            className={styles.radioInput}
          />
          <span className={styles.optionLabel}>Favorites</span>
        </label>
      </div>
    </div>
  )
}

export default Menu

