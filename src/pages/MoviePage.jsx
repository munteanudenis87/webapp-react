import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ReviewsCard from "../components/ReviewsCard";
import ReviewForm from "../components/ReviewForm";

// import del context per il loader
import { useGlobal } from "../contexts/GlobalContext";

function MoviePage() {

    const redirect = useNavigate();

    // prendiamo dal context il valore che ci serve
    const {setIsLoading} = useGlobal();

    // funzione di disattivazione loader
    const loadingFalse = () => {
        // settiamo il loading attivo
        setIsLoading(false)
    }

    // recuperiamo id da param dinamico
    const { id } = useParams();

    // set di var di stato
    const [movie, setMovie] = useState({});

    // definiamo funzione chiamata a BE
    const fetchMovie = () => {

        // settiamo il loading attivo
        setIsLoading(true);

        axios.get("http://localhost:3000/api/movies/" + id)
            .then(response => { setMovie(response.data) })
            .catch(err => {
                console.log(err);
                if (err.status === 404) redirect('/404')
            })
            .finally(setTimeout(loadingFalse, 1000))
    }

    // definizione funzione rendering reviews
    const renderReview = () => {
        return movie.tags?.map((review) => <ReviewsCard key={review.id} review={review} />)
    }

    // chiamata da useEffect
    useEffect(fetchMovie, []);

    // funzione delete movie
    const deleteMovie = e => {
        e.preventDefault();

        axios.delete(`http://localhost:3000/api/movies/${id}`)
            .then(response => {
                console.log(response);
                redirect("/");
            })
            .catch((err) => {
                console.log(err);
            })            
            .finally()
    }
    //useEffect(deleteMovie, []);

    return (
        <>
            <header id="movie" className="border-bottom border-1 mb-3">
                <div><Link className="btn btn-danger mb-2" to="/" onClick={deleteMovie}>Delete movie</Link></div>
                <div className="d-flex mb-3">
                    {movie?.image && <img className="movie-img" src={movie?.image} alt={movie?.title} />}
                </div>
                <h1>{movie?.title}</h1>
                <h3 className="text-muted"><i>Director: {movie?.director}</i></h3>
                <h6 className="text-muted">Genre: {movie?.genre}</h6>
                <h6 className="text-muted">Release year: {movie?.release_year}</h6>
                <p>{movie?.abstract}</p>
            </header>
            <section id="reviews">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Our community reviews</h4>
                </header>
                {renderReview()}
            </section>
            <section>
                {movie?.id && <ReviewForm movie_id={movie.id} refreshReviews={fetchMovie} />}
            </section>
            <footer className="border-top border-1 pt-2 mb-3 d-flex justify-content-end">
                <Link className="btn btn-secondary" to="/">Back to home</Link>
            </footer>
        </>
    )
}
export default MoviePage