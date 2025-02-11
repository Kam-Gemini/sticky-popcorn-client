import { useState, useEffect } from "react"
import { reviewShow } from "../../services/reviewService"
import { useParams } from "react-router"

export default function SingleReview() {

    const [review, setReview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { reviewId, movieId } = useParams()

    useEffect(() => {
        if (!movieId || !reviewId) return
        setIsLoading(true)
        reviewShow(movieId, reviewId)
        .then(data => setReview(data))
        .catch(error => console.log("Error fetching review", error))
        .finally(() => setIsLoading(false))
    }, [movieId, reviewId])

    return (
        <>
        <section>
            {
                isLoading
                    ?<p>Loading Review</p>
                    : review
                    ? <div key={reviewId} className="review-card">
                        <p>{review.content}</p>
                        <p>Written by {review.author.username}</p>
                    </div>
                    : <p>Review not found</p>
            }

        </section>
        </>
    )

}