import React, { useEffect, useState } from 'react';
import { getMovieDetailsByID, getCreditDetail, getMoviesByGenre } from '../api/Api';
import { useParams } from 'react-router-dom';
import '../styles/Movie.css';
import { FaRegStar, FaRegClock } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import MovieList from '../sections/MovieList';

function Movie() {
  const [movie, setMovie] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [movieCreditInfo, setMovieCreditInfo] = useState({ cast: [], crew: [] });
  const { id } = useParams();
  const [movieGenres, setMovieGenres] = useState("");
  const [similarMovies, setSimilarMovies] = useState("");
  // useEffect((id)=>{
  //   id = useParams();
  // },[]);
  // 🔹 Validate ID
  if (!Number.isInteger(parseInt(id))) {
    return <h1>Movie not found</h1>;
  }

  // 🔹 Fetch Movie Info
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieDetailsByID(id);
        // console.log("Fetched movie:", response);
        setMovie(response);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  // 🔹 Update Images
  useEffect(() => {
    if (movie) {
      setImageUrl(`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`);
      setPosterImage(`https://image.tmdb.org/t/p/w1280${movie.poster_path}`);
      setMovieGenres(movie.genres.map(g => g.id));
      // setSimilarMovies(async ()=>{
      //   await getMoviesByGenre(movieGenres);
      // });
      //console.log(movie.genres.map(g => g.name))
    }
  }, [movie]);

useEffect(() => {
  const fetchSimilarMovies = async () => {
    if (movieGenres && movieGenres.length > 0) {
      const response = await getMoviesByGenre(movieGenres);
      setSimilarMovies(response.results);
    }
  };

  fetchSimilarMovies();
}, [movieGenres]); // runs when movieGenres changes

  // 🔹 Fetch Credits (Director + Actors)
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        setMovieCreditInfo({ cast: [], crew: [] }); 
        const response = await getCreditDetail(id);
        // console.log(response);
        setMovieCreditInfo(response.data);
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };
    fetchCredits();
  }, [id]);

  // 🔹 Loading State
  if (!movie || !movieCreditInfo.cast.length) {
    return <h2>Loading movie details...</h2>;
  }

  // 🔹 Extract Director
  const director = movieCreditInfo.crew.find(
    member => member.job === "Director"
  );

  // 🔹 Extract Top 6 Actresses
  const actresses = movieCreditInfo.cast
    .filter(actor => actor.gender === 1)
    .slice(0, 6);
  // fetch similar movies

  
  return (
    <>
      <section
        className="section"
        style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="section-content">
          <div className="dark">
          <div
            className="classSubContainerLeft"
            style={{ backgroundImage: `url(${posterImage})` }}
          ></div>
          <div className="classSubContainerRight">
            <h1>{movie.title}</h1>
            <p style={{ color: "rgba(172, 175, 180, 1)" }}>{movie.original_title}</p>

            {/* Movie Data */}
            <div className='movieData'>
              <div className='ratingContainer'><FaRegStar />{movie.vote_average}/10</div>
              <div className='ratingContainer'><FaRegClock />{movie.runtime} min</div>
              <div className='ratingContainer'><CiCalendar />{movie.release_date.split("-")[0]}</div>
            </div>

            {/* Genres */}
            <div className='genreContainer'>
              {movie.genres.map((genre) => (
                <div key={genre.id} className='genreTag'>{genre.name}</div>
              ))}
            </div>

            {/* Description */}
            <div className='movieDiscription'>
              <p>{movie.overview}</p>
            </div>

            {/* Buttons */}
            <div className="btnContainar">
              <button className="btn-primary">Watch Now</button>
              <button className="btn-secondary">+ Add to Watchlist</button>
            </div>

            {/* Director */}
            <div className="director">
              <h3>Director</h3>
              <p>{director ? director.name : "N/A"}</p>
            </div>

            {/* Main Characters */}
            <h3>Main Characters</h3>
            <br />
            <div className="actress-container">
              {actresses.map((actress) => (
                <div key={actress.id} className="actress-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actress.profile_path}`}
                    alt={actress.name}
                    className="actress-photo"
                  />
                  <h4>{actress.name}</h4>
                  <p>as {actress.character}</p>
                </div>
              ))}
            </div>
          </div>
          </div>

          
        </div>
      </section>
          {/* 🔹 Similar Movies Section */}
    {similarMovies && similarMovies.length > 0 && (
      <MovieList title="Similar Movies" movies={similarMovies} />
    )}
    </>
  );
}

export default Movie;
