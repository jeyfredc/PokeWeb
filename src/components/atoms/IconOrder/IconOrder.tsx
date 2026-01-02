import Sort from '../../../assets/Icons/sort.svg?react'
import { usePokemonFilterStore } from '../../../store/slices/pokemonSlice'
import styles from './IconOrder.module.css'

const IconOrder = () => {
  const { sortDirection, toggleSortDirection, sortOrder } = usePokemonFilterStore()

  const handleClick = () => {
    // Solo permitir cambiar dirección si no es "favorites"
    if (sortOrder !== 'favorites') {
      toggleSortDirection()
    }
  }

  const isRotated = sortDirection === 'desc'
  const isDisabled = sortOrder === 'favorites'

  return (
    <div
      className={`${styles.container} ${isDisabled ? styles.disabled : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={isDisabled ? 'Sort disabled for favorites' : 'Toggle sort direction'}
    >
      <Sort 
        className={`${styles.sort} ${isRotated ? styles.rotated : ''}`}
      />
    </div>
  )
}

export default IconOrder