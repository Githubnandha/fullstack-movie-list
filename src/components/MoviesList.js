import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const history = useHistory();
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
  const handleClick = (e) => {
    console.log(e);
    history.push(`/api/movies/${e}`);
  };
  return (
    <>
      <div id="movie-container">
        <header>
          <h1 id="header">Movie List</h1>
        </header>
        <main>
          <div className="movie-list">
            {movies.map((movie, index) => (
              <div key={index} className="movie-card">
                <p className="movie-title">Title: {movie.title}</p>
                <p className="movie-tageline">
                  Tagline: {movie.tagline || "No tagline available"}
                </p>
                <p className="movie-vote-average">
                  Rating: {movie.vote_average}
                </p>
                <button onClick={() => handleClick(movie.id)}>
                  view detials
                </button>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <h3 id="footer">Every movie is a world waiting to be explored.</h3>
        </footer>
      </div>
    </>
  );
}
