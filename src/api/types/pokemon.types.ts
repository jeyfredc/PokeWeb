// Tipos TypeScript para Pokemon basados en la API GraphQL

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  pokemon_species_id: number
  sprites: {
    front_default: string
    other?: string
  } | Array<{
    front_default: string
    other?: string
  }>
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  species?: {
    name: string
    generation: {
      name: string
    }
    pokemon_v2_pokemonspeciesflavortexts: Array<{
      flavor_text: string
    }>
  }
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface PokemonStat {
  base_stat: number
  stat: {
    name: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
  }
  isHidden: boolean
}

export interface PokemonListItem {
  id: number
  name: string
  sprites: {
    front_default: string
  }
  types: PokemonType[]
}

export interface PokemonListResponse {
  pokemon_v2_pokemon: PokemonListItem[]
}

export interface PokemonDetailResponse {
  pokemon_v2_pokemon: Pokemon[]
}

