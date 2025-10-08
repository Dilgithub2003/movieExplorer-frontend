import React from 'react'
import '../components/styles/LargeMovieCard.css'
import { useNavigate } from 'react-router';
import { setMovieWatchlist } from './api/Api';

function LargeMovieCard({movie}) {
    const key=movie.id
    const name=movie.title
    const year=movie.release_date
    const imageURL=movie.poster_path
    const rating=movie.vote_average
    const navigate = useNavigate();
        const realUrl = imageURL
  ? `https://image.tmdb.org/t/p/w500${imageURL}`
  : "/loading.png"; // your placeholder image
    const navigateMovieInfo = (movieID) => {
    navigate(`/movie/${movieID}`);
  };
  const handleAddToWatchlist = (e) => {
    e.stopPropagation(); //
    setMovieWatchlist(parseInt(movie.id));
  };
    return (
        <>
            <div className="largeMovieCard" style={{ backgroundImage: `url(${realUrl})` }} onClick={() => navigateMovieInfo(movie.id)}>
                <p>1.5</p>
                <div className="largeMovieOverlay" >
                    <h3>{name}</h3>
                    <h3>{year.split("-")[0]}</h3>
                    <div onClick={handleAddToWatchlist} className='wtList'>Watchlist</div>
                </div>
            </div>
        </>
    )
}

export default LargeMovieCard
