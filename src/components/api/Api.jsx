import axios from "axios"
import React from 'react'

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzQwNDUzYjlkYTE3M2JjNTNkZjEwNmFhNzA5MzlhOCIsIm5iZiI6MTc1ODM0MjcxNi45MTI5OTk5LCJzdWIiOiI2OGNlMmUzYzkwYzgzMTBmNjZjZWJhYjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2WdsNC4LcDf6Oma81HADU0yfvsMB_qf3LROM7ZZtE0U";
const BASE_URL = "https://api.themoviedb.org/3"
const BASE_URL02 = "https://movieexplorerbackend-1.onrender.com/api/users";
const token = localStorage.getItem("jwtToken") || "";

export const tmdb = axios.create({
    baseURL : BASE_URL,
    headers: {
    Authorization: API_KEY,
  },
//     params: {
//     api_key: API_KEY, // automatically added to every request
//   },
});

export const api = axios.create({
  baseURL:BASE_URL02,
  headers:{
    Authorization: token ,
  },
})
// 🔹 Attach token dynamically before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // always latest token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const getTrendingMovies = async(page=1)=> {
    const response = await tmdb.get("/trending/movie/week",{
        params:{page},
    });
    return response.data;
};

export const getMovieDetailsByID = async(movieId) => {
    const response = await tmdb.get(`/movie/${movieId}`,{
    params: { append_to_response: "credits,recommendations" },   
    })
    return response.data;
}

export const getMoviesByGenre = async (genreIds, page = 1, matchAll = false) => {
  try {
    // Convert input to array if single genre passed
    const genres = Array.isArray(genreIds) ? genreIds : [genreIds];

    // 🔹 OR Logic (default)
    if (!matchAll) {
      const response = await tmdb.get("/discover/movie", {
        params: {
          with_genres: genres.join(","), // "28,12"
          page,
        },
      });
      return response.data;
    }

    // 🔹 AND Logic (custom filter)
    // Fetch movies for the first genre, then filter by others
    const response = await tmdb.get("/discover/movie", {
      params: {
        with_genres: genres[0], // start with first genre
        page,
      },
    });

    const filtered = response.data.results.filter(movie =>
      genres.every(g => movie.genre_ids.includes(Number(g)))
    );

    return {
      ...response.data,
      results: filtered,
    };

  } catch (error) {
    console.error("Error fetching movies by genres:", error);
    return { results: [] };
  }
};


export const getMoviesByKeyword = async(query, page = 1)=>{
    const response = await tmdb.get("/search/movie",{
    params: { query, page },
});
    return response.data;
};

export const getLatestReleases = async (page = 1) => {
  const response = await tmdb.get("/discover/movie", {
    params: {
      sort_by: "release_date.desc",
      "primary_release_date.lte": "2025-12-31"
,// today's date
      page,
    },
  });
  return response.data;
};

export const getHeroSectionMovie = async ()=>{
  const response = await tmdb.get("/trending/movie/day");
  return response.data;
}

export const getCreditDetail = async (id)=>{
  const response = await tmdb.get(`movie/${id}/credits`);
  return response;
  console.log(response);
}


export const setMovieWatchlist = async (movieId) => {
  try {
    const response = await api.post(
      '/watchlist/addmovie',
      { movieID: movieId }, // body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};