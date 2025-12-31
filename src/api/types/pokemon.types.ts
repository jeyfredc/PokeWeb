// Tipos TypeScript para Pokemon basados en la API GraphQL

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  baseExperience: number
  sprites: {
    front_default: string
    other?: {
      'official-artwork': {
        front_default: string
      }
    }
  }
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  species: {
    name: string
    generation: {
      name: string
    }
  }
}

export interface PokemonType {
  type: {
    name: string
  }
}

export interface PokemonStat {
  baseStat: number
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

