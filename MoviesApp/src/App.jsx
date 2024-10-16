import "./App.css";
import apis from "./apis/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Trailer from "./Components/trailer/Trailer";
import Reviews from "./Components/reviews/Reviews";
import NotFound from "./Components/notFound/NotFound";

export default function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const response = await apis.get("/movies");
      console.log(response.data);

      setMovies(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await apis.get(`/reviews/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);

      setReviews(singleMovie.reviews);
    } catch (error) {}
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}>
            {" "}
          </Route>
        </Route>
      </Routes>
    </main>
  );
}
