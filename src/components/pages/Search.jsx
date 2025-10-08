import React from 'react'
import { useLocation } from 'react-router-dom';
import { getMoviesByKeyword } from '../api/Api';
import { useState,useEffect } from 'react';
import LargeMovieCards from '../sections/largeMovieCards';
import '../styles/search.css'

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const data = await getMoviesByKeyword(query);
        setResults(data.results); 
        console.log(data)// adjust based on your API response
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [query]);

    return (
        <>
        <h1 className='searchTopic'>{`Search results for "${query}"`}</h1>
        <LargeMovieCards movies={results}></LargeMovieCards>
        </>
    )
}

export default Search
