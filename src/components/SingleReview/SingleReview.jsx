import { useState, useEffect, useContext } from "react"
import { reviewShow, reviewDelete } from "../../services/reviewService"
import { useNavigate, useParams, Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"


export default function SingleReview() {

    const [review, setReview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { reviewId, movieId } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!movieId || !reviewId) return
        setIsLoading(true)
        reviewShow(movieId, reviewId)
            .then(data => setReview(data))
            .catch(error => {
                console.log("Error fetching review", error)
            })
            .finally(() => setIsLoading(false))
    }, [movieId, reviewId])


    const handleDelete = async () => {
        console.log("before deletion", review)
        const confirmDelete = window.confirm("Are you sure you want to delete this review?")
        if (confirmDelete)
            try {
                await reviewDelete(movieId, reviewId)
                console.log("review deleted succesfully")
                setReview(null)
                console.log("after deletion", review)
                navigate(`/movies/${movieId}/reviews`)
            } catch (error) {
                console.log("failed to delete review", error)

            }
        }

    return (
        <section>
            {isLoading
                ? <p>Loading Review...</p>
                : review
                ? <div key={reviewId} className="review-card">
                    <p>{review.content}</p>
                    <p>Written by {review?.author?.username}</p>

                    {user?._id === review?.author?._id && (
                        <>
                            <Link to={`/movies/${movieId}/reviews/${reviewId}/edit`}>
                            <button>Edit</button>
                            </Link>
                                <button onClick={handleDelete}>Delete</button>
                            <Link to={`/movies/${movieId}/reviews`}>Cancel</Link>
                        </>
                    )}
                </div>
                : <p>Review not found</p>
            }
        </section>
    )
}