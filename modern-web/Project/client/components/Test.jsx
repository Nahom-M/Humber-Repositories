import React, { useState, useEffect } from "react";

function Test() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Handle the error, e.g., display an error message to the user
        setError("Failed to fetch movies. Please try again later.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.duration} minutes</p>
              <img src={movie.image} alt={movie.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
}

export default Test;
/*
import React, { useState, useEffect } from "react";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setMovies(data);
      });

    //console.log(movies);
  }, []);

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.duration} minutes</p>
            <img alt={movie.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
*/
