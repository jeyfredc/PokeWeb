import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export interface PokemonDescription {
  speciesId: number
  flavorText: string
}

interface DescriptionsState {
  descriptions: Record<number, string> // speciesId -> flavorText
  getDescription: (speciesId: number) => string | undefined
  setDescription: (speciesId: number, flavorText: string) => void
  hasDescription: (speciesId: number) => boolean
  clearDescriptions: () => void
}

export const useDescriptionsStore = create<DescriptionsState>()(
  devtools(
    persist(
      (set, get) => ({
        descriptions: {},

        getDescription: (speciesId) => {
          return get().descriptions[speciesId]
        },

        setDescription: (speciesId, flavorText) => {
          set((state) => {
            // Solo actualizar si no existe o si el texto es diferente
            if (state.descriptions[speciesId] === flavorText) {
              return state
            }
            return {
              descriptions: {
                ...state.descriptions,
                [speciesId]: flavorText,
              },
            }
          }, false, 'setDescription')
        },

        hasDescription: (speciesId) => {
          return speciesId in get().descriptions
        },

        clearDescriptions: () => {
          set({ descriptions: {} }, false, 'clearDescriptions')
        },
      }),
      {
        name: 'pokemon-descriptions-storage',
      }
    ),
    {
      name: 'DescriptionsStore',
    }
  )
)

