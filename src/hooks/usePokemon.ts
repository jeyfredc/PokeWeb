import { useQuery } from '@apollo/client/react'
import { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME } from '../api/queries'
import type { Pokemon, PokemonDetailResponse } from '../api/types/pokemon.types'

interface UsePokemonParams {
  id?: number
  name?: string
  skip?: boolean
}

interface UsePokemonResult {
  pokemon: Pokemon | null
  loading: boolean
  error: Error | null
}

/**
 * Hook para obtener un Pokémon por ID o por nombre
 * @param params - Puede recibir `id` (número) o `name` (string)
 * @returns Datos del Pokémon, estado de carga y errores
 */
export const usePokemon = ({ id, name, skip = false }: UsePokemonParams): UsePokemonResult => {
  // Determinar si buscar por ID o por nombre
  const searchById = id !== undefined && id !== null
  const searchByName = name !== undefined && name !== null && name.trim() !== ''

  // Query por ID
  const {
    data: dataById,
    loading: loadingById,
    error: errorById
  } = useQuery<PokemonDetailResponse>(GET_POKEMON_BY_ID, {
    variables: { id },
    skip: skip || !searchById || searchByName, // Skip si no hay ID o si hay nombre
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  })

  // Query por nombre
  const {
    data: dataByName,
    loading: loadingByName,
    error: errorByName
  } = useQuery<PokemonDetailResponse>(GET_POKEMON_BY_NAME, {
    variables: { name: `%${name}%` }, // Usar ILIKE con wildcards para búsqueda parcial
    skip: skip || !searchByName || searchById, // Skip si no hay nombre o si hay ID
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first'
  })

  // Determinar qué datos usar
  const data = searchById ? dataById : dataByName
  const loading = searchById ? loadingById : loadingByName
  const error = searchById ? errorById : errorByName

  // Extraer el primer Pokémon de los resultados
  const pokemon = data?.pokemon_v2_pokemon?.[0] || null

  return {
    pokemon: pokemon as Pokemon | null,
    loading: loading || false,
    error: error as Error | null
  }
}

/**
 * Hook para obtener un Pokémon por ID
 */
export const usePokemonById = (id: number | undefined, skip = false) => {
  return usePokemon({ id, skip })
}

/**
 * Hook para obtener un Pokémon por nombre
 */
export const usePokemonByName = (name: string | undefined, skip = false) => {
  return usePokemon({ name, skip })
}

