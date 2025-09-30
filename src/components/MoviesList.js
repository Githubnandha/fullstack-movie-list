import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

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

  const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  return (
    <>
      <div id="movie-container">
        <header>
          <h1 id="header">Movie List</h1>
        </header>
        <main>
          <div id="search-bar">
            <input
              type="text"
              id="searchBar"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search movie..."
            />
          </div>
          <div className="movie-list">
            {currentMovies.length > 0 ? ( // ✅ FIX: use currentMovies here
              currentMovies.map((movie, index) => (
                <div key={index} className="movie-card">
                  <p className="movie-title">Title: {movie.title}</p>
                  <p className="movie-tageline">
                    Tagline: {movie.tagline || "No tagline available"}
                  </p>
                  <p className="movie-vote-average">
                    Rating: {movie.vote_average}
                  </p>
                  <button onClick={() => handleClick(movie.id)}>
                    view details
                  </button>
                </div>
              ))
            ) : (
              <div id="movie-not-found-div">
                <p id="movie-not-found">Movie not found</p>
              </div>
            )}
          </div>

          {filteredMovies.length > moviesPerPage && (
            <div className="pagination">
              {/* Prev button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {/* Numbered page buttons */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
        <footer>
          <h3 id="footer">Every movie is a world waiting to be explored.</h3>
        </footer>
      </div>
    </>
  );
}
