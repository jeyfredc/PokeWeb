import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PokemonCard.module.css'
import UnknownPokemon from '../../../assets/Images/unknown-pokemon.png'
import Card from '../../atoms/Card/Card'
import LazyImage from '../../atoms/LazyImage/LazyImage'
import { useFavoritesStore } from '../../../store/slices/favoritesSlice'
  
interface PokemonCardProps {
  id: number
  name: string
  image: string
  onClick?: () => void
  isSelected?: boolean
}

const StarIcon = ({ isFavorite }: { isFavorite: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isFavorite ? "#FFD700" : "none"}
    stroke="#DC0A2D"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${styles.starIcon} ${isFavorite ? styles.starFilled : ''}`}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, onClick, isSelected = false }) => {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/pokemon/${id}`)
    }
  }

  const [imageError, setImageError] = useState(false)

  const imageUrl = image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const favorite = isFavorite(id)

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Usar la URL de imagen correcta, preferir artwork oficial si no hay imagen
    // Si image está vacío o es undefined, usar artwork oficial de mejor calidad
    const imageToSave = image && image.trim() !== '' 
      ? image 
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    toggleFavorite({ id, name, image: imageToSave })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card 
      className={`${styles.pokemonCard} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <div className={styles.upperSection}>

      </div>
      <div className={styles.lowerSection}>
        <div className={styles.pokemonCardNumber}>#{String(id).padStart(3, '0')}</div>
        <button
          className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
          onClick={handleStarClick}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <StarIcon isFavorite={favorite} />
        </button>
        <div className={styles.pokemonCardImageContainer}>
          {imageError ? (
            <img 
              src={UnknownPokemon}
              alt={name}
              className={styles.pokemonCardImage} 
            />
          ) : (
            <LazyImage
              src={imageUrl}
              alt={name}
              className={styles.pokemonCardImage}
              placeholder={UnknownPokemon}
              onError={handleImageError}
            />
          )}
          <div className={styles.shadow}>
            <div className={styles.pokemonCardName}>{name}</div>
          </div> 
        </div>
      </div>
    </Card>
  )
}

export default PokemonCard

