import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type SortOrder = 'number' | 'name' | 'favorites'
export type SortDirection = 'asc' | 'desc'

interface PokemonFilterState {
  selectedType: string | null
  searchQuery: string
  sortOrder: SortOrder
  sortDirection: SortDirection
  setSelectedType: (type: string | null) => void
  setSearchQuery: (query: string) => void
  setSortOrder: (order: SortOrder) => void
  setSortDirection: (direction: SortDirection) => void
  toggleSortDirection: () => void
  clearFilters: () => void
}

// Store para filtros y búsqueda (opcional, puede ser local también)
export const usePokemonFilterStore = create<PokemonFilterState>()(
  devtools(
    (set) => ({
      selectedType: null,
      searchQuery: '',
      sortOrder: 'number',
      sortDirection: 'asc',

      setSelectedType: (type) => {
        set({ selectedType: type }, false, 'setSelectedType')
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query }, false, 'setSearchQuery')
      },

      setSortOrder: (order) => {
        set({ sortOrder: order }, false, 'setSortOrder')
      },

      setSortDirection: (direction) => {
        set({ sortDirection: direction }, false, 'setSortDirection')
      },

      toggleSortDirection: () => {
        set((state) => ({
          sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc'
        }), false, 'toggleSortDirection')
      },

      clearFilters: () => {
        set({ selectedType: null, searchQuery: '', sortOrder: 'number', sortDirection: 'asc' }, false, 'clearFilters')
      },
    }),
    {
      name: 'PokemonFilterStore',
    }
  )
)

