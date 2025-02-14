import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../contexts/UserContext.jsx"
import { useNavigate, useParams, Link } from "react-router"
import { reviewUpdate, reviewShow } from "../../services/reviewService.js"

import styles from "./UpdateReview.module.css"

export default function UpdateReview() {

    const { movieId, reviewId } = useParams()
    const { user } = useContext(UserContext)
    
    const [reviewData, setReviewData] = useState({
        content: ""
    })
    const [error, setError] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/signin")
            return
        } 

        reviewShow(movieId, reviewId)
        .then(data => {
            if(data.author._id !== user._id) {
                navigate(`/movies/${movieId}/reviews/`)
            }
                setReviewData(data)
        })
    }, [movieId, reviewId, user, navigate])


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const updateReview = await reviewUpdate(movieId, reviewId, reviewData)
            navigate(`/movies/${movieId}/reviews`)
            setReviewData(updateReview)
        } catch (error) {
            setError(error.response)
        }
    }
            
        
    const handleChange = async (event) => {
        setReviewData({ ...reviewData, [event.target.name]: event.target.value })
    }

    return (
        <section className={styles.updateReviewContainer}>
            <div className={styles.header}>
            <h1>Update your review!</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.reviewForm}>
                <div className={styles.formControl}>
                    <label hidden htmlFor="content">Content</label>
                    <textarea className={styles.reviewTextArea}
                    name="content"
                    id="content"
                    placeholder="What's your review?"
                    value={reviewData.content}
                    onChange={handleChange} >
                    </textarea>
                </div>

                <div>
                    <Link to={`/movies/${movieId}/reviews/`} className={styles.button}>
                        Cancel
                    </Link>
                    <button type="submit" disabled={reviewData.content === ""} className={styles.button}>
                        Update Review
                    </button>
                </div>
            </form>
        </section>
    )
}