import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ReviewsCard from "../components/ReviewsCard";
import ReviewForm from "../components/ReviewForm";

function MoviePage() {
    // recuperiamo id da param dinamico
    const { id } = useParams();

    // set di var di stato
    const [movie, setMovie] = useState({});

    // definiamo funzione chiamata a BE
    const fetchMovie = () => {
        axios.get("http://localhost:3000/api/movies/" + id)
            .then(response => { setMovie(response.data) })
            .catch(err => {
                console.log(err);
            })
    }

    // definizione funzione rendering reviews
    const renderReview = () => {
        return movie.tags?.map((review) => <ReviewsCard key={review.id} review={review} />)
    }

    // chiamata da useEffect
    useEffect(fetchMovie, []);

    return (
        <>
            <header id="movie" className="border-bottom border-1 mb-3">
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