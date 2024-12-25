import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Skeleton from 'react-loading-skeleton'; // Skeleton loader package
import './skeleton.css'; // Importing the styles

// GraphQL query to fetch movies
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      release_date
      rating
      description
      poster
    }
  }
`;

// GraphQL query to fetch favorites
const GET_FAVORITES = gql`
  query GetFavorites {
    favorites {
      id
    }
  }
`;

// GraphQL mutation for adding to favorites
const ADD_FAVORITE = gql`
  mutation AddFavorite($movieId: ID!) {
    addFavorite(movieId: $movieId) {
      id
    }
  }
`;

// GraphQL mutation for removing from favorites
const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($movieId: ID!) {
    removeFavorite(movieId: $movieId) {
      id
    }
  }
`;

const MovieList = () => {
  const { loading, error, data: movieData } = useQuery(GET_MOVIES);
  const { data: favoritesData, refetch: refetchFavorites } = useQuery(GET_FAVORITES);

  const [addFavorite] = useMutation(ADD_FAVORITE, {
    onCompleted: () => refetchFavorites(), // Refetch favorites after adding
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE, {
    onCompleted: () => refetchFavorites(), // Refetch favorites after removing
  });

  const handleFavorite = (movieId) => {
    const isFavorite = favoritesData?.favorites?.some((fav) => fav.id === movieId);
    if (isFavorite) {
      removeFavorite({ variables: { movieId } });
    } else {
      addFavorite({ variables: { movieId } });
    }
  };

  if (loading) {
    return (
      <div className="movie-list">
        {[...Array(10)].map((_, index) => (
          <div className="movie-card" key={index}>
            <Skeleton height={300} />
            <Skeleton width={200} />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!movieData?.movies?.length) {
    return <p>No movies available</p>;
  }

  const favoritesIds = favoritesData?.favorites?.map((fav) => fav.id) || [];

  return (
    <div className="movie-list">
      {movieData.movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <div className="movie-img-container">
            <img
              className="movie-img"
              src={movie.poster || 'https://via.placeholder.com/200x300'} // Fallback image if no poster URL
              alt={movie.title}
            />
            <div className="movie-info-overlay">
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.description}</p>
            </div>
          </div>
          <button
            className={`favorite-btn ${favoritesIds.includes(movie.id) ? 'active' : ''}`}
            onClick={() => handleFavorite(movie.id)}
          >
            {favoritesIds.includes(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
