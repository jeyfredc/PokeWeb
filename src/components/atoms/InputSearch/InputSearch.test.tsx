import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import InputSearch from './InputSearch'

const mockSetSearchQuery = vi.fn()
const mockUsePokemonFilterStore = vi.fn()

// Mock the store
vi.mock('../../../store/slices/pokemonSlice', () => ({
  usePokemonFilterStore: () => mockUsePokemonFilterStore(),
}))

describe('InputSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUsePokemonFilterStore.mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      sortOrder: 'number',
      sortDirection: 'asc',
      setSortOrder: vi.fn(),
      setSortDirection: vi.fn(),
      toggleSortDirection: vi.fn(),
    })
  })

  it('renders input with placeholder', () => {
    render(
      <BrowserRouter>
        <InputSearch placeholder="Search Pokemon" />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText(/search pokemon/i)).toBeInTheDocument()
  })

  it('updates search query on input change', async () => {
    const user = userEvent.setup()

    render(
      <BrowserRouter>
        <InputSearch />
      </BrowserRouter>
    )
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'pikachu')

    expect(mockSetSearchQuery).toHaveBeenCalled()
  })
})

