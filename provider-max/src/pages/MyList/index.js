import { useState, useEffect } from "react";

import { getFromLocalStorage, saveToLocalStorage } from '../../storage/localStorage';

import MovieItem from '../../components/MovieItem';
import Button from '../../components/Button';

import './style.css';

export default function MyList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const movies = getFromLocalStorage('myList') || [];
        setMovies(movies);
    }, [])

    function deleteMovie(id) {
        const filteredMovies = movies.filter((savedMovie) => savedMovie.id !== id);
        setMovies(filteredMovies);
        saveToLocalStorage('myList', filteredMovies);
    }

    return (
        <div className="container">
            <h2>Minha Lista</h2>

            <section>
                {
                    movies.length === 0 ?
                        <h2>Não há nenhum filme salvo na sua lista</h2>
                        :
                        <div className="movie-grid">
                            {movies.map((movie) => {
                                return (
                                    <div className="btn-container">
                                        <div className="button">
                                            <Button label='X' onClick={() => deleteMovie(movie.id)} />
                                        </div>
                                        <MovieItem key={movie.id} movie={movie} />
                                    </div>
                                );
                            })}
                        </div>
                }
            </section>
        </div>
    );
}

