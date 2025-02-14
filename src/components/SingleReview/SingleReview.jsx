import { useState, useEffect, useContext } from "react"
import { reviewShow, reviewDelete } from "../../services/reviewService"
import { useNavigate, useParams, Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"

import styles from "./SingleReview.module.css"

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
        
        const confirmDelete = window.confirm("Are you sure you want to delete this review?")
        if (confirmDelete) {
            try {
                await reviewDelete(movieId, reviewId)
                navigate(`/movies/${movieId}/reviews`)

            } catch (error) {
                console.log("failed to delete review", error)

            }
        }
        }

    return (
        <>
        <section className={styles.header}>
            <h1>A review by {review?.author?.username}</h1>
            </section>

            <div className={styles.singleReviewContainer}>
            {isLoading
                ? <p>Loading Review...</p>
                : review
                ? <div key={reviewId} className={styles.reviewCard}>
                    <p className={styles.reviewContent}>{review.content}</p>

                    <p className={styles.reviewDate}>
                        Created at: <span className={styles.reviewDate}>{new Date(review.createdAt).toUTCString()}</span>
                    </p>
                    {review.createdAt !== review.updatedAt && (
                        <p className={styles.reviewDate}>
                            Last Edited: <span className={styles.reviewDate}>{new Date(review.updatedAt).toUTCString()}</span>
                        </p>
                    )}

                    {user?._id === review?.author?._id && (
                        <>
                            <Link to={`/movies/${movieId}/reviews/${reviewId}/edit`} className={styles.button}>
                                Edit
                            </Link>
                            <button onClick={handleDelete} className={styles.button}>
                                Delete
                            </button>
                            <Link to={`/movies/${movieId}/reviews`} className={styles.button}>
                                Cancel
                            </Link>
                        </>
                    )}
                </div>
                : <p>Review not found</p>
            }
        </div>
        <section className={styles.reviewLink}>
                    <div>
                    <Link to={`/movies/${movieId}/reviews`} className={styles.reviewLink}>
                        Back to all reviews
                    </Link>
                    </div>
                    </section>
        </>
    )
}