function ReviewsCard ({ review }) {
    // const { review } = props;

    const { name, vote, text } = review;
    return (
        <div className="card mb-4">
            <div className="card-body">
                <p className="card-text">{text}</p>
                <strong>Vote: {vote}/5</strong>
                <address><i>By {name}</i></address>
            </div>
        </div>
    )
}
export default ReviewsCard