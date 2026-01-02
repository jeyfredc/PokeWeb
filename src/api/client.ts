import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

// Endpoint de GraphQL de PokeAPI
const GRAPHQL_ENDPOINT = 'https://beta.pokeapi.co/graphql/v1beta'

// Crear el link HTTP
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
})

// Crear el cliente Apollo
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon: {
            // Merge policy para paginación
            keyArgs: ['where', 'limit', 'offset', 'order_by'],
            merge(existing = [], incoming) {
              // Si es una query de un solo Pokémon (por ID), reemplazar
              if (incoming.length === 1 && existing.length === 1) {
                return incoming;
              }
              // Para listas, hacer merge evitando duplicados
              const existingIds = new Set(existing.map((p: { id: number }) => p.id));
              const newItems = incoming.filter((p: { id: number }) => !existingIds.has(p.id));
              return [...existing, ...newItems];
            },
          },
        },
      },
      pokemon_v2_pokemon: {
        keyFields: ['id'],
      },
      pokemon_v2_pokemonspecies: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
})

export default apolloClient

