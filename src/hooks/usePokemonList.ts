import { useQuery } from '@apollo/client/react'
import { GET_POKEMON_LIST, GET_POKEMON_LIST_BY_ID, GET_POKEMON_LIST_BY_NAME } from '../api/queries'
import type { PokemonListItem, PokemonListResponse } from '../api/types/pokemon.types'

interface UsePokemonListParams {
  limit?: number
  offset?: number
  minId?: number
  maxId?: number
  name?: string
}

interface UsePokemonListResult {
  pokemonList: PokemonListItem[]
  loading: boolean
  error: Error | null
  hasMore: boolean
}

/**
 * Hook para obtener lista de Pokémon
 * Puede filtrar por ID (rango) o por nombre
 */
export const usePokemonList = ({
  limit = 20,
  offset = 0,
  minId,
  maxId,
  name
}: UsePokemonListParams = {}): UsePokemonListResult => {
  // Determinar qué query usar
  const filterById = minId !== undefined || maxId !== undefined
  const filterByName = name !== undefined && name.trim() !== ''

  // Query para lista completa
  const {
    data: dataAll,
    loading: loadingAll,
    error: errorAll
  } = useQuery<PokemonListResponse>(GET_POKEMON_LIST, {
    variables: { limit, offset },
    skip: filterById || filterByName,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  })

  // Query filtrada por ID
  const {
    data: dataById,
    loading: loadingById,
    error: errorById
  } = useQuery<PokemonListResponse>(GET_POKEMON_LIST_BY_ID, {
    variables: {
      minId: minId || 1,
      maxId: maxId || 1000,
      limit,
      offset
    },
    skip: !filterById || filterByName,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  })

  // Query filtrada por nombre
  const {
    data: dataByName,
    loading: loadingByName,
    error: errorByName
  } = useQuery<PokemonListResponse>(GET_POKEMON_LIST_BY_NAME, {
    variables: {
      name: `%${name}%`, // Búsqueda parcial con wildcards
      limit,
      offset
    },
    skip: !filterByName || filterById,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  })

  // Determinar qué datos usar
  let data, loading, error

  if (filterById) {
    data = dataById
    loading = loadingById
    error = errorById
  } else if (filterByName) {
    data = dataByName
    loading = loadingByName
    error = errorByName
  } else {
    data = dataAll
    loading = loadingAll
    error = errorAll
  }

  const pokemonList = (data?.pokemon_v2_pokemon || []) as PokemonListItem[]
  const hasMore = pokemonList.length === limit

  return {
    pokemonList,
    loading: loading || false,
    error: error as Error | null,
    hasMore
  }
}

/**
 * Hook para obtener lista filtrada por rango de IDs
 */
export const usePokemonListById = (
  minId?: number,
  maxId?: number,
  limit = 20,
  offset = 0
) => {
  return usePokemonList({ minId, maxId, limit, offset })
}

/**
 * Hook para obtener lista filtrada por nombre
 */
export const usePokemonListByName = (
  name: string,
  limit = 20,
  offset = 0
) => {
  return usePokemonList({ name, limit, offset })
}

