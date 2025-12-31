import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (pokemon) => {
        set((state) => {
          if (state.favorites.some((fav) => fav.id === pokemon.id)) {
            return state
          }
          return {
            favorites: [...state.favorites, pokemon],
          }
        })
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }))
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
        set({ favorites: [] })
      },
    }),
    {
      name: 'pokemon-favorites-storage', 
    }
  )
)

