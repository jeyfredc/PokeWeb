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
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
})

export default apolloClient

