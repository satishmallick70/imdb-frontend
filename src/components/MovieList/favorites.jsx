import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Skeleton from 'react-loading-skeleton'; // Skeleton loader package
import './skeleton.css'; // Importing the styles

const GET_FAVORITES = gql`
  query GetFavorites {
    favorites {
      id
      title
      release_date
      rating
      description
      poster
    }
  }
`;

const Favorites = () => {
  const { loading, error, data, refetch } = useQuery(GET_FAVORITES);

  useEffect(() => {
    if (data) {
      console.log('Favorites data:', data);  // Log the complete data object to check the structure
    }
  }, [data]);

  // Refetch favorites when the data changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();  // Refetch favorites at regular intervals
    }, 5000);  // For example, refetch every 5 seconds (adjust based on your needs)

    return () => clearInterval(intervalId);  // Clean up interval when component unmounts
  }, [refetch]);

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

  if (!data || !data.favorites || data.favorites.length === 0) {
    return <p>No favorites available</p>;
  }

  return (
    <div className="movie-list">
      {data.favorites.map((movie) => (
        <div className="movie-card" key={movie.id || movie._id}>  {/* Use movie._id if id is not present */}
          <img
            className="movie-img"
            src={movie.poster || 'https://via.placeholder.com/200x300'} // Fallback image if no poster URL
            alt={movie.title}
          />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <p>{movie.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
