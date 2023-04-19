import { useState, useEffect } from "react";
import api from "../../services/api";

import Button from "../../components/Button";
import MovieItem from "../../components/MovieItem";

import './style.css';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await api.get('/movie/now_playing', {
                    params: { page: page }
                });
                const eightMovies = response.data.results.slice(0, 8);
                setMovies((prevMovies) =>
                    page === 1 ? eightMovies : [...prevMovies, ...eightMovies]
                );
            } catch (e) {
                alert('Ocorreu um erro ao carregar os filmes. Por favor, tente novamente mais tarde');
            } finally {
                setLoading(false);
            }

        }

        getMovies();
    }, [page]);

    function nextPage() {
        setPage((prevPage) => prevPage + 1);
    }

    return (
        <div className="container">
            <h2>Filmes em Destaque</h2>
            <span>
                Na Provider Max, você assiste às estreias mais esperadas,
                os melhores filmes e séries estão aqui, variedade para toda a
                família e muito mais. Assine agora e garanta o primeiro mês grátis
                e desconto nos próximos 6 meses!
            </span>
            <section>
                <h2>Últimos Lançamentos</h2>
                {
                    loading ?
                        <div className="loading">CARREGANDO...</div>
                        :
                        <>
                            <div className="movie-grid">
                                {movies.map((movie) => {
                                    return (
                                        <MovieItem key={movie.id} movie={movie} />
                                    );
                                })}
                            </div>
                            <Button label="Próxima Página" onClick={nextPage} />
                        </>
                }
            </section>
        </div>
    );
}

