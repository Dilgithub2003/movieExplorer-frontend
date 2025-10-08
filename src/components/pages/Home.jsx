import React from 'react'
import MovieCard from '../MovieCard'
import '../styles/home.css'
import { useState,useEffect } from 'react'
import { getTrendingMovies, getMovieDetailsByID, getMoviesByGenre,getMoviesByKeyword, getLatestReleases,setMovieWatchlist} from '../api/Api'
import MovieList from '../sections/MovieList'
import Hero from '../sections/Hero'
import { api } from '../api/Api'

function Home() {
    const [trendingMovies,setTrendingMovies] = useState([]);
    const [searchMovies,setSearchMovies] = useState([]);
    const [moviesBygenres, setMoviesByGenres] = useState([]);
    const [moviesByQuery, setMoviesByQuery] = useState([]);
    const [latestRelease, setLatestRelease] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const token = localStorage.getItem('token');


useEffect(() => {
  const fetchUserGenres = async () => {
    try {
      const response = await api.get('/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      //  const response = await api.post('/profile/updateprofile', {
      //       headers: { Authorization: `Bearer ${token}` },
      //       genres : userInterest
      //   });

      setMovieGenres(response.data.genres || []);
      console.log(response.data)
    } catch (err) {
      console.error("Failed to fetch user genres:", err);
    }
  };
  fetchUserGenres();
}, [token]);



useEffect(() => {
  const fetchSimilarMovies = async () => {
    if (!Array.isArray(movieGenres) || movieGenres.length === 0) return;

    try {
      // Use OR logic — fetch movies matching ANY of the user’s favorite genres
      const response = await getMoviesByGenre(movieGenres, 1, false);
      console.log(response.results);
      setSimilarMovies(response.results || []);
    } catch (err) {
      console.error("Failed to fetch similar movies:", err);
    }
  };

  fetchSimilarMovies();
}, [movieGenres]);



    useEffect(()=>{
        async function fetchData() {
            const data = await getTrendingMovies();
            setTrendingMovies(data.results);
        }
        fetchData();
    },[]);
    // console.log(trendingMovies);




    useEffect(()=>{
        async function fetchData() {
            const data = await getMovieDetailsByID(617126); // change movie ID
            setSearchMovies(data);
        }
        fetchData();
    },[]);
     // console.log(searchMovies);

     useEffect(()=>{
        async function fetchData(){
            const data = await getMoviesByGenre(878,1);
            setMoviesByGenres(data.results)
        }
        fetchData();
     },[]);
    // console.log(moviesBygenres);

     useEffect(()=>{
        async function fetchData() {
            const data = await getMoviesByKeyword("Lucy",1);
            setMoviesByQuery(data.results);
        }
        fetchData();
     },[]);
    //  console.log(moviesByQuery);

    useEffect(()=>{
        async function fetchData(){
            const data = await getLatestReleases();
            setLatestRelease(data.results);
        }
        fetchData();
    },[]);


  
    // console.log(latestRelease);
    

     
    return (
        <>
            <Hero></Hero>
            { similarMovies.length != 0 &&(
                <div className='movie-gallery'>
                <MovieList title={'Recommended'} movies={similarMovies}></MovieList>
            </div>
            )}
            <div className='movie-gallery'>
                <MovieList title={"Trending"} movies={trendingMovies}></MovieList>
            </div>
            <div className='movie-gallery'>
                <MovieList title={"Latest"} movies={latestRelease}></MovieList>
                <div className="footerMargin"></div>
            </div>
            
             {/* <div className='movie-gallery'>
                <MovieList title={"Trending"} movies={similarMovies}></MovieList>
            </div>  */}
        </>
    )
}

export default Home
