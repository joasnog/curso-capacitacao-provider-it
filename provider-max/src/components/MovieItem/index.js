import { Link } from 'react-router-dom';

import './style.css';

export default function MovieItem({ movie }) {
    return (
        <Link to={`/filme/${movie.id}`}>
            <article className="movie-item" key={movie.id}>
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={`Poster do Filme ${movie.title}`}
                />
                <strong>{movie.title}</strong>
            </article>
        </Link>
    );
}