import { useState } from 'react'

import Sort  from '../../../assets/Icons/sort.svg?react'
import styles from './IconOrder.module.css'

const IconOrder = () => {
  const [isRotated, setIsRotated] = useState(false)

  const handleClick = () => {
    setIsRotated(!isRotated)
  }

  return (
    <div
      className={styles.container}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label="Sort"
    >
      <Sort 
        className={`${styles.sort} ${isRotated ? styles.rotated : ''}`}
      />
    </div>
  )
}

export default IconOrder