import { describe, it, expect, beforeEach } from 'vitest'
import { usePokemonFilterStore } from './pokemonSlice'

describe('pokemonSlice', () => {
  beforeEach(() => {
    // Reset store before each test
    usePokemonFilterStore.getState().setSearchQuery('')
    usePokemonFilterStore.getState().setSortOrder('number')
    usePokemonFilterStore.getState().setSortDirection('asc')
  })

  it('initializes with default values', () => {
    const state = usePokemonFilterStore.getState()
    expect(state.searchQuery).toBe('')
    expect(state.sortOrder).toBe('number')
    expect(state.sortDirection).toBe('asc')
  })

  it('updates search query', () => {
    usePokemonFilterStore.getState().setSearchQuery('charmander')
    expect(usePokemonFilterStore.getState().searchQuery).toBe('charmander')
  })

  it('updates sort order', () => {
    usePokemonFilterStore.getState().setSortOrder('name')
    expect(usePokemonFilterStore.getState().sortOrder).toBe('name')
  })

  it('toggles sort direction', () => {
    const initialState = usePokemonFilterStore.getState().sortDirection
    usePokemonFilterStore.getState().toggleSortDirection()
    expect(usePokemonFilterStore.getState().sortDirection).not.toBe(initialState)
  })
})

