import React from 'react'
import searchIcon from '../../../styles/icons/search.png'
import { usePokemonFilterStore } from '../../../store/slices/pokemonSlice'
import styles from './InputSearch.module.css'

interface InputSearchProps {
  placeholder?: string
  className?: string
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder = 'Search',
  className = ''
}) => {
  const { searchQuery, setSearchQuery } = usePokemonFilterStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <img 
        src={searchIcon} 
        alt="Search" 
        className={styles.searchIcon}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  )
}

export default InputSearch
