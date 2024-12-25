import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Favorites from './components/movieList/favorites';
import PopularMovies from './components/MovieList/popular';
import TopRatedMovies from './components/MovieList/TopRatedMovies';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Make sure your GraphQL server is running at this endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          {/* Home page shows MovieList */}
          <Route index element={<Home />} />
          
          {/* You can add the MovieList directly here or modify Home to include it */}
          <Route path="/" element={<Home />}>
            <Route path="movies" element={<MovieList />} /> {/* This will render MovieList under Home */}
          </Route>

          {/* Route for Favorites */}
          
          <Route path="/movies/top_rated" element={<TopRatedMovies />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="/movies/popular" element={<PopularMovies />} />
          
          
          {/* Fallback route for undefined paths */}
          <Route path="*" element={<h1>Error: Page Not Found</h1>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
