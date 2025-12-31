import React from 'react'
import searchIcon from '../../../styles/icons/search.png'
import styles from './InputSearch.module.css'

interface InputSearchProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: (value: string) => void
  className?: string
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder = 'Search',
  value,
  onChange,
  onSearch,
  className = ''
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && value) {
      onSearch(value)
    }
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
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
    </div>
  )
}

export default InputSearch
