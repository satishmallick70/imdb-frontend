import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './popular.css';  // Add styles for the popular movies page

const API_KEY = 'your_tmdb_api_key';  // Replace with your TMDb API key
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=6673df67aa06d859424230d7b4776e0d&language=en-US`;

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(POPULAR_URL);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch popular movies');
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <p>Loading popular movies...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="popular-movies">
      <h1>Popular Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              className="movie-img"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // Image URL from TMDb
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
