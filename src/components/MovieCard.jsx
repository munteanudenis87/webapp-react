import { Link } from "react-router-dom"

function MovieCard({ movie }) {

    // const { movie } = props;
    console.log(movie)
    const { title, director, genre, release_year, abstract, image, id } = movie;

    return (
        <div className="card mb-4">
            {image && <img src={image} className="card-img-top" alt={title} />}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <address><i>Director: {director || 'Anonymus'}</i></address>
                <p className="card-text">{abstract}</p>
                <Link to={`movies/${id}`} className="btn btn-primary">See more</Link>
            </div>
        </div>
    )
}

export default MovieCard