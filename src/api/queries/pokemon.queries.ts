import { gql } from '@apollo/client'

// Query para obtener lista de todos los Pokémon
export const GET_POKEMON_LIST = gql`
  query GetPokemonList($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, order_by: { name: asc }) {
      id
      name
      sprites: pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`

// Query para obtener lista de Pokémon filtrada por ID (rango)
export const GET_POKEMON_LIST_BY_ID = gql`
  query GetPokemonListById($minId: Int, $maxId: Int, $limit: Int, $offset: Int) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        id: {
          _gte: $minId
          _lte: $maxId
        }
      }
      order_by: { id: asc }
    ) {
      id
      name
      sprites: pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`

// Query para obtener lista de Pokémon filtrada por nombre (búsqueda parcial)
export const GET_POKEMON_LIST_BY_NAME = gql`
  query GetPokemonListByName($name: String!, $limit: Int, $offset: Int) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        name: { _ilike: $name }
      }
      order_by: { name: asc }
    ) {
      id
      name
      sprites: pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`

// Query para obtener detalles de un Pokémon por ID (número)
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      base_experience
      pokemon_species_id
      sprites: pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
        other: sprites(path: "other.official-artwork.front_default")
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
        is_hidden
      }
    }
  }
`

// Query para obtener la generación de un Pokémon por species_id
export const GET_POKEMON_GENERATION = gql`
  query GetPokemonGeneration($speciesId: Int!) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $speciesId } }) {
      id
      generation: pokemon_v2_generation {
        name
      }
    }
  }
`

// Query para obtener la descripción de un Pokémon por species_id
export const GET_POKEMON_DESCRIPTION = gql`
  query GetPokemonDescription($speciesId: Int!) {
    pokemon_v2_pokemonspecies(where: { id: { _eq: $speciesId } }) {
      id
      name
      pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        limit: 1
      ) {
        flavor_text
      }
    }
  }
`

// Query para obtener detalles de un Pokémon por nombre
export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon_v2_pokemon(where: { name: { _ilike: $name } }) {
      id
      name
      height
      weight
      base_experience
      sprites: pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
        other: sprites(path: "other.official-artwork.front_default")
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
        is_hidden
      }
      species: pokemon_v2_pokemonspecies {
        name
        generation: pokemon_v2_generation {
          name
        }
      }
    }
  }
`

// Query para obtener detalles de un Pokémon (acepta ID o nombre)
// Alias para mantener compatibilidad
export const GET_POKEMON_DETAIL = GET_POKEMON_BY_ID

// Query para obtener tipos de Pokémon (para filtros)
export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemon_v2_type(where: { id: { _lte: 18 } }) {
      id
      name
    }
  }
`

// Query para filtrar Pokémon por tipo
export const GET_POKEMON_BY_TYPE = gql`
  query GetPokemonByType($typeName: String!, $limit: Int, $offset: Int) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: $typeName } }
        }
      }
      order_by: { name: asc }
    ) {
      id
      name
      sprites: pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
`

