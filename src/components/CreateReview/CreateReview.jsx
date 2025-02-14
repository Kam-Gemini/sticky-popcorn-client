import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx"
import { useNavigate, useParams, Link } from "react-router"
import { reviewPost } from "../../services/reviewService.js"

import styles from "./CreateReview.module.css"


export default function CreateReview() {

    const { movieId } = useParams()
    const { user } = useContext(UserContext)
    
    const [reviewData, setReviewData] = useState({
        content: ""
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})



    useEffect(() => {
        if (!user) {
            sessionStorage.setItem("redirectPath", `/movies/${movieId}/create-review`)
            navigate("/signin")
        } else {
            const redirect = sessionStorage.getItem("redirectPath")
            if (redirect) {
                sessionStorage.removeItem("redirectPath")
                navigate(redirect)
            }
        }
    }, [user, navigate, movieId])


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const createReview = await reviewPost(movieId, reviewData)
            navigate(`/movies/${movieId}/reviews/`)
            setReviewData(createReview)
        } catch (error) {
        }
    }
            
    const handleChange = async (event) => {
        setReviewData({ ...reviewData, [event.target.name]: event.target.value })
    }

    return (
        <section className={styles.createReviewContainer}>
            <div className={styles.header}>
            <h1>Add your review!</h1>
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
                    <Link to={`/movies/${movieId}`} className={styles.button}>
                        Cancel
                    </Link>
                    <button type="submit" disabled={reviewData.content === ""} className={styles.button}>
                        Post Review
                    </button>
                </div>
            </form>
        </section>

    )
}