import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getFromLocalStorage, saveToLocalStorage } from '../../storage/localStorage';

import api from "../../services/api";

import Button from '../../components/Button';
import './style.css';

export default function Movie() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMovie() {
            try {
                const response = await api.get(`/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                return navigator('/', { replace: true });
            } finally {
                setLoading(false);
            }
        }

        getMovie();
    }, [id, navigator])

    function saveToList() {
        const movieList = getFromLocalStorage('myList') || [];
        // Verifica se o filme a ser salvo já está na lista 
        const hasThisMovie = movieList.some((movieSaved) => movieSaved.id === movie.id);

        if (hasThisMovie) {
            return alert('Filme já está na sua lista');
        }

        movieList.push(movie);
        saveToLocalStorage('myList', movieList);
        alert('Filme salvo com sucesso!');
    }

    return (
        <div className="container-movie-details">
            {
                loading ?
                    <div className="loading">CARREGANDO...</div>
                    :
                    <div className="movie-details">
                        <img className="dark-filter" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`Imagem de fundo do filme ${movie.title}`} />
                        <div className="movie-info">
                            <h2>{movie.title}</h2>
                            <span>{movie.overview}</span>
                            <div className="movie-rating" >
                                <span>IMDb {movie.vote_average.toFixed(2).replace('.', ',')}</span>
                                <span>{movie.release_date.substring(0, 4)}</span>
                            </div>
                            <Button
                                label='Ver Trailer'
                                to={`https://www.youtube.com/results?search_query=trailer ${movie.title}`}
                                target="blank"
                            />
                            <Button label='Adicionar à Lista' onClick={saveToList} />
                        </div>
                    </div>
            }
        </div>
    );
}

