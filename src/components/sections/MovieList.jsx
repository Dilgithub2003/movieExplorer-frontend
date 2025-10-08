import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard";
import "../styles/MovieList.css";

function MovieList({ title, movies }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    let scrollAmount = 0;

    // Width of ONE card (including margin!)
    const cardWidth = grid.firstChild
      ? grid.firstChild.getBoundingClientRect().width + 16 // add gap
      : 200; // fallback

    const interval = setInterval(() => {
      if (scrollAmount >= grid.scrollWidth - grid.offsetWidth) {
        // reached end → reset to start
        scrollAmount = 0;
      } else {
        // move by one card
        scrollAmount += cardWidth;
      }
      grid.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }, 6000); // every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="movie-list">
      <h2>{title} Movies</h2>
      <div className="carousel-container">
        <div className="movie-grid" ref={gridRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MovieList;
