import { create } from 'zustand'

interface PokemonFilterState {
  selectedType: string | null
  searchQuery: string
  setSelectedType: (type: string | null) => void
  setSearchQuery: (query: string) => void
  clearFilters: () => void
}

// Store para filtros y búsqueda (opcional, puede ser local también)
export const usePokemonFilterStore = create<PokemonFilterState>((set) => ({
  selectedType: null,
  searchQuery: '',

  setSelectedType: (type) => {
    set({ selectedType: type })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  clearFilters: () => {
    set({ selectedType: null, searchQuery: '' })
  },
}))

