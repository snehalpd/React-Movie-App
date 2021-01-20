import React, { useEffect, useState } from "react";
//import logo from "./logo.svg";
//import "./App.css";
import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b38d98e5f68e416f8542eacf1a3a416d&page=1";


const IMG_API = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=b38d98e5f68e416f8542eacf1a3a416d&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const movies = ["1", "2", "3"];


   useEffect(() => {
     getMovies(FEATURED_API);
   }, []);


  const getMovies = (API) => {
    fetch(API).then(res => res.json()).then(data => {
      console.log(data);
      setMovies(data.results);
    });
  }


   const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {

      getMovies(SEARCH_API + searchTerm);

    setSearchTerm(""); 
    }
  };

    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    }

  return ( <>
    <header>
      <form onSubmit={handleOnSubmit}> 
        <input 
            className="search" 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={handleOnChange}
        />
      </form>
    </header>
  
    <div className="movie-container">
      
      {movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
  </>
  );

}

export default App;


