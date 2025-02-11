import { useState, useEffect } from "react"
import { reviewIndex } from "../../services/reviewService.js"
import { useParams, Link } from "react-router"



export default function AllReviews() {

    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const { movieId } = useParams()
    

    useEffect(() => {
        if (!movieId) return
        setIsLoading(true)
        reviewIndex(movieId)
            .then(data => setReviews(data))
            .catch(error => console.log("Error fetching reviews", error))
            .finally(() => setIsLoading(false))
    }, [movieId])

    return (
        <>
            <section>
                {
                    isLoading
                        ? <p>Loading Reviews...</p> 
                        : reviews.length > 0
                        ? reviews.map((review) => {
                            const date = new Date(review.createdAt)
                            return (
                            <div key={review._id} className="review-card">
                                <Link to={`/movies/${movieId}/reviews/${review._id}`}><p>{review.content}</p></Link>
                                
                                <p>Written by {review.author.username}</p>
                                <p>{date.toUTCString()}</p>
                            </div>
                            )
                        })
                        : <p>There are no reviews for this movie yet.</p>
                }
                <div>
                    <Link to={`/movies/${movieId}/create-review`}>Add your review</Link>
                </div>
            </section>
        </>
    )
}