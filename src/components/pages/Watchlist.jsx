import React, { useEffect, useState } from "react";
import { tmdb, api } from "../api/Api";
import LargeMovieCards from "../sections/LargeMovieCards";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getMovies() {
      try {
        // Fetch watchlist (list of movie IDs)
        const response = await api.get("/watchlist/movies",  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const movieEntries = response.data.movies || []; // e.g. [{ movieID: 550 }]
        const movieIds = movieEntries.map((m) => m.movieID);

        if (movieIds.length === 0) {
          setMovies([]);
          return;
        }

        // Fetch details from TMDb in parallel
        const moviePromises = movieIds.map((id) => tmdb.get(`/movie/${id}`));
        const tmdbResponses = await Promise.all(moviePromises);

        // Extract data
        const movieDetails = tmdbResponses.map((res) => res.data);

        setMovies(movieDetails);
        console.log("Full Watchlist Details:", movieDetails);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      }
    }

    if (token) getMovies();
  }, [token]);

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <div className="overlay"></div>
      <h2>Your Watchlist</h2>
      <LargeMovieCards movies={movies} />
    </div>
  );
}

export default Watchlist;
