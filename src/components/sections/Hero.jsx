import React, { useEffect, useState } from 'react'
import "../styles/Hero.css"
import { getHeroSectionMovie,setMovieWatchlist } from '../api/Api'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router';

function Hero() {
    const [heroMovie, setHeroMovie] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        async function fetchData(){
            const data = await getHeroSectionMovie();
            setHeroMovie(data.results[Math.floor(Math.random() * 20)]);
        }
        fetchData()
    },[]);

    const handleAddToWatchlist = () => {
        try{
            //e.stopPropagation(); //
            setMovieWatchlist(parseInt(heroMovie.id));
        }catch(err){
            return console.log(err)
        }
        return toast.success("Movie successfully added to watchlist ")
    };

    //console.log(heroMovie);
    const setImageUrl= (`https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path}`)
    return (
        <>
        <section className="hero" style={{ backgroundImage: `url(${setImageUrl})` }}>
            <div className="hero-content">
                <div className='heroText'>
                    <h1>{heroMovie.title}</h1>
                    <p>
                        {heroMovie.overview}
                    </p>
                    <Link to={`/movie/${heroMovie.id}`}><button className="btn-primary">Watch Now</button></Link> 
                    <button className="btn-secondary" onClick={()=>handleAddToWatchlist(heroMovie.id)}>+ Add to Watchlist</button>
                </div>
           </div>
        </section>
        </>
    )
}

export default Hero
