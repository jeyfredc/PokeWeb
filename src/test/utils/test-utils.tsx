import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'

// Create a test Apollo Client with a mock link
const createTestClient = () => {
  return new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  })
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const client = createTestClient()

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ApolloProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

