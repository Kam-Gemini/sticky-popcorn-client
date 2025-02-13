import { useState, useEffect } from "react"
import { reviewIndex } from "../../services/reviewService.js"
import { useParams, Link } from "react-router"

import styles from "./AllReviews.module.css"

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
            <section className={styles.header}>
                <h2>All reviews for </h2>
                </section>

                <section className={styles.allReviews}>

                {
                    isLoading
                        ? <p>Loading Reviews...</p> 
                        : reviews.length > 0
                        ? reviews.map((review) => {
                            const date = new Date(review.createdAt)
                            return (
                            <div key={review._id} className={styles.reviewCard}>
                                <Link to={`/movies/${movieId}/reviews/${review._id}`}><p className={styles.content}>{review.content}</p></Link>
                                
                                <p>Written by <span>{review.author.username}</span></p>
                                <p className={styles.date}>{date.toUTCString()}</p>
                            </div>
                            )
                        })
                        : <p>There are no reviews for this movie yet.</p>
                }
                </section>
                <section className={styles.links}>
                <div>
                    <Link to={`/movies/${movieId}/create-review`}>Add your review</Link>
                </div>
            </section>
        </>
    )
}