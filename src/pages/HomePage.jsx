import axios from "axios";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard"

// import del context per il loader
import { useGlobal } from "../contexts/GlobalContext";

function HomePage() {

    // prendiamo dal context il valore che ci serve
    const { setIsLoading } = useGlobal();

    // funzione di disattivazione loader
    const loadingFalse = () => {
        // settiamo il loading attivo
        setIsLoading(false)
    }
    // creiamo la var di stato
    const [movies, setMovies] = useState([]);

    // definizione funzione per chiamata ajax a BE 
    const fetchMovies = () => {
        // settiamo il loading attivo
        setIsLoading(true);

        axios.get("http://localhost:3000/api/movies")
            .then(response => { setMovies(response.data) })
            .catch(err => {
                console.log(err);
            })
            .finally(setTimeout(loadingFalse, 1000))
    }
    // definizione funzione rendering per card movies
    const renderMovies = () => {
        return movies.map((movie) => {
            return (
                <div className="col" key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
            )
        })
    }
    useEffect(fetchMovies, []);

    return (
        <>
            <h1 className="text-primary">Movies</h1>
            <h2><i>Movie community</i></h2>
            <div className="row row-cols-3 mt-4">
                {renderMovies()}
            </div>
        </>
    )
}

export default HomePage
