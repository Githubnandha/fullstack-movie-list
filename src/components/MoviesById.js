import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";

export default function MoviesById() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function getById() {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const payload = await response.json();
        console.log("Fetched movie:", payload);
        setMovie(payload.data || payload);
      } catch (error) {
        console.error("Fetch error:", error.message || error);
      }
    }
    getById();
  }, [id]);

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString()
    : "N/A";

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>
        <strong>Tagline:</strong> {movie.tagline || "No tagline available"}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}/10
      </p>
      <p>
        <strong>Release Date:</strong> {releaseDate}
      </p>
      <p>
        <strong>Runtime:</strong> {runtime}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Status:</strong> {movie.status}
      </p>
      <button onClick={() => history.push("/")}>Return to List</button>
    </div>
  );
}
