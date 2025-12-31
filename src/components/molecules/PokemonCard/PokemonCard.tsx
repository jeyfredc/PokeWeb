import React, { useState } from 'react'
import styles from './PokemonCard.module.css'
import UnknownPokemon from '../../../assets/images/unknown-pokemon.png'
import Card from '../../atoms/Card'
  
interface PokemonCardProps {
  id: number
  name: string
  image: string
  onClick?: () => void
  isSelected?: boolean
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, onClick, isSelected = false }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const imageUrl = image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const displayImage = imageError || imageLoading ? UnknownPokemon : imageUrl

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  return (
    <Card 
      className={`${styles.pokemonCard} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <div className={styles.upperSection}>

      </div>
      <div className={styles.lowerSection}>
        <div className={styles.pokemonCardNumber}>#{String(id).padStart(3, '0')}</div>
        <div className={styles.pokemonCardImageContainer}>
          <img 
            src={displayImage}
            alt={name}
            className={styles.pokemonCardImage} 
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className={styles.shadow}>
            <div className={styles.pokemonCardName}>{name}</div>
          </div> 
        </div>
      </div>
    </Card>
  )
}

export default PokemonCard

