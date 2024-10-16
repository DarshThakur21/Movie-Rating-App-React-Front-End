import React from 'react';
import Carousel from 'react-material-ui-carousel';
import './Hero.css';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button'; 

const Hero = ({ movies }) => {

  const navigate =useNavigate();

  function reviews(movieId){
    navigate(`/reviews/${movieId}`);
  }

  
  // Check if movies is defined and is an array
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return <div>No movies available.</div>;
  }

  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {movies.map((movie) => {
          
          const backdropUrl = movie.backdrops && movie.backdrops.length > 0 ? movie.backdrops[0] : '';

          return (
            <Paper key={movie.imdbId}>   
              <div className='movie-card-container'>
                <div 
                  className='movie-card' 
                  style={{ "--img": `url(${backdropUrl})` }}  
                >
                  <div className='movie-detail'>
                    <div className='movie-poster'>
                      <img src={movie.poster} alt={movie.title} />  ``
                    </div>
                    <div className='movie-title'>
                      <h4>{movie.title}</h4>
                    </div>
                    <div className='movie-buttons-container'>

                      <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length-11)}`} >
                      <div className='play-button-icon-container'>
                        <FontAwesomeIcon className='play-button-icon'
                            icon={faCirclePlay}
                          /> 
                      </div>
                        </Link>

                      <div className="movie-review-button-container">
                          <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                      </div>
                      
                    </div>  
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
