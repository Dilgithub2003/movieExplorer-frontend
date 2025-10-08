import { useEffect, useRef } from "react";
import MovieCard from "../MovieCard";
import "../styles/largeMovieCards.css";
import LargeMovieCard from "../LargeMovieCard";
import { useNavigate } from "react-router";

function LargeMovieCards({movies }) {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const navigateMovieInfo = (movieID) => {
    navigate(`/movie/${movieID}`);
  };
    return (
    <section className="Large-movie-list">
      <div className="Large-carousel-container">
        <div className="Large-movie-grid" ref={gridRef}>
          {movies.map((movie) => (
            <LargeMovieCard movie = {movie}
           />
          ))}
        </div>
      </div>
    </section>
  );

}

export default LargeMovieCards;
