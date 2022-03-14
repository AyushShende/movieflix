import { Add, Remove } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";
function MovieList({ searchValue }) {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // fetch data from API
  const getMovieList = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // Save favourite movies to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const favouriteList = [...favourites, movie];
    setFavourites(favouriteList);
    saveToLocalStorage(favouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const favouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(favouriteList);
    saveToLocalStorage(favouriteList);
  };

  useEffect(() => {
    getMovieList(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const favouriteMovies = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    setFavourites(favouriteMovies);
  }, []);

  return (
    <div className="movieList">
      {/* Brand Title */}
      <Link to={"/"}>
        <h1 className="title">MOVIEFLIX</h1>
      </Link>

      {/* Searched Movies */}
      <div className="movieListWrapper">
        {movies.map((movie, index) => (
          <div className="card" key={index}>
            <img className="cardImg" src={movie.Poster} alt="movie" />
            <div className="cardDesc">
              <div className="cardTitle">{movie.Title}</div>
              <span>{movie.Year}</span>
              <span
                className="iconWrapper"
                onClick={() => addFavouriteMovie(movie)}
              >
                <Fab
                  className="add"
                  size="small"
                  color="secondary"
                  aria-label="add"
                >
                  <Add />
                </Fab>
              </span>
              <div className="iconCaption">Add to favourites</div>
            </div>
          </div>
        ))}
      </div>

      {/* Favoutie Movies List */}
      <h3 style={{ color: "white" }}>Favourites</h3>
      {favourites && (
        <div className="movieListWrapper">
          {favourites.map((favourite, index) => (
            <div className="card" key={index}>
              <img className="cardImg" src={favourite.Poster} alt="movie" />
              <div className="cardDesc">
                <div className="cardTitle">{favourite.Title}</div>
                <span>{favourite.Year}</span>
                <span
                  className="iconWrapper"
                  onClick={() => removeFavouriteMovie(favourite)}
                >
                  <Fab
                    className="add"
                    size="small"
                    color="secondary"
                    aria-label="add"
                  >
                    <Remove />
                  </Fab>
                </span>
                <div className="iconCaption">Remove from favourites</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
