import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export interface FavoritePokemon {
  id: number
  name: string
  image: string
}

interface FavoritesState {
  favorites: FavoritePokemon[]
  addFavorite: (pokemon: FavoritePokemon) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  toggleFavorite: (pokemon: FavoritePokemon) => void
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  devtools(
    persist(
      (set, get) => ({
        favorites: [],

        addFavorite: (pokemon) => {
          set((state) => {
            if (state.favorites.some((fav) => fav.id === pokemon.id)) {
              return state
            }
            // Asegurar que siempre haya una imagen válida
            const pokemonWithImage = {
              ...pokemon,
              image: pokemon.image && pokemon.image.trim() !== ''
                ? pokemon.image
                : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
            }
            return {
              favorites: [...state.favorites, pokemonWithImage],
            }
          }, false, 'addFavorite')
        },

        removeFavorite: (id) => {
          set((state) => ({
            favorites: state.favorites.filter((fav) => fav.id !== id),
          }), false, 'removeFavorite')
        },

        isFavorite: (id) => {
          return get().favorites.some((fav) => fav.id === id)
        },

        toggleFavorite: (pokemon) => {
          const { isFavorite, addFavorite, removeFavorite } = get()
          if (isFavorite(pokemon.id)) {
            removeFavorite(pokemon.id)
          } else {
            addFavorite(pokemon)
          }
        },

        clearFavorites: () => {
          set({ favorites: [] }, false, 'clearFavorites')
        },
      }),
      {
        name: 'pokemon-favorites-storage',
        // Migrar favoritos existentes que tengan imágenes vacías
        onRehydrateStorage: () => (state) => {
          if (state?.favorites) {
            const needsMigration = state.favorites.some(
              fav => !fav.image || fav.image.trim() === ''
            )
            
            if (needsMigration) {
              const updatedFavorites = state.favorites.map(fav => {
                if (!fav.image || fav.image.trim() === '') {
                  return {
                    ...fav,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fav.id}.png`
                  }
                }
                return fav
              })
              state.favorites = updatedFavorites
            }
          }
        },
      }
    ),
    {
      name: 'FavoritesStore',
    }
  )
)

