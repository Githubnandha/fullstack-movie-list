import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:3001/api/movies");
        const payload = await response.json();
        setMovies(payload.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    }
    getData();
  }, []);

  // Show movie details page
  if (selectedMovie) {
    return (
      <div className="App">
        <button onClick={() => setSelectedMovie(null)}>⬅ Back to list</button>
        <div className="movie-details">
          <h2>{selectedMovie.title}</h2>
          {selectedMovie.tagline && (
            <p>
              <em>{selectedMovie.tagline}</em>
            </p>
          )}
          <p>
            <strong>Overview:</strong> {selectedMovie.overview}
          </p>
          <p>
            <strong>Release Date:</strong>{" "}
            {new Date(selectedMovie.release_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Runtime:</strong> {selectedMovie.runtime} min
          </p>
          <p>
            <strong>Rating:</strong> {selectedMovie.vote_average} / 10
          </p>
          <p>
            <strong>Status:</strong> {selectedMovie.status}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Nice Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => setSelectedMovie(movie)}
          >
            <h3>{movie.title}</h3>
            {movie.tagline && (
              <p>
                <em>{movie.tagline}</em>
              </p>
            )}
            <p>Rating: {movie.vote_average} / 10</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
