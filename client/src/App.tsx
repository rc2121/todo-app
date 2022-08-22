
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import Login from './components/login';
import { routes } from './components/routes'
import PrivateRouting from './components/private';
import Header from './components/header';
import Signup from './components/signup';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if(graphQLErrors) {
    for(const error of graphQLErrors){
      if(typeof window) {
        console.log(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
        )
      }
    }
  }
  if(networkError) {
    console.log(
      `[Network error]: ${networkError.message} ${networkError.stack}`
    )
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}`} : {})
    }
  }
})

const httpLink = new HttpLink({
  /**
   * Fixes Jest complaining about:
   *  Invariant Violation:
   *    "fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor.
   */
  fetch,
  uri: process.env.REACT_APP_GRAPHQL_URL,
})

const terminatingLink = authLink.concat(httpLink)

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, terminatingLink]),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup /> } />
            {routes.map((item) => (
              <Route
                key={item.id}
                path={item?.path}
                element={<PrivateRouting>{item.element}</PrivateRouting>}
              />
            ))}
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
