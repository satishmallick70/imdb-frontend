import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Make sure axios is installed
import './popular.css';
const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=6673df67aa06d859424230d7b4776e0d&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching top-rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className="movie-img"
          />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRatedMovies;
