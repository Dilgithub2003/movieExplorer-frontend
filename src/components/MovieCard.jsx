import React from 'react'
import './styles/movieCard.css'
import PropTypes from "prop-types";
import { setMovieWatchlist } from './api/Api';
import { useNavigate } from 'react-router-dom'; // 
import { toast } from 'react-toastify';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const realUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/loading.png"; // fallback image

  const handleAddToWatchlist = (e) => {
    try{
      e.stopPropagation(); //
    setMovieWatchlist(parseInt(movie.id));
    }catch(err){
      return console.log(err)
    }
    return toast.success("Movie successfully added to watchlist ")
  };

  const navigateMovieInfo = (movieID) => {
    navigate(`/movie/${movieID}`);
  };

  return (
    <div
      className="movieCard"
      style={{ backgroundImage: `url(${realUrl})` }}
      onClick={() => navigateMovieInfo(movie.id)} //  
    >
      <p>1.5</p>
      <div className="movieOverlay">
        <h3>{movie.title}</h3>
        <h3>{movie.release_date?.split("-")[0]}</h3>
        <div>
          <button onClick={handleAddToWatchlist} className='watchlistBtn'>Watchlist</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
