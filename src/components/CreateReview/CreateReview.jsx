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


    // useEffect(() => {
    //     if(!user) {
    //         navigate("/signin")
    //     }
    // }, [user, navigate])


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = await reviewPost(movieId, reviewData)
            setReview(data)
            navigate(`movies/${movieId}/reviews/${reviewPost._id}`)
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    const handleChange = async (event) => {
        setReviewData({ ...reviewData, [event.target.name]: event.target.value })
    }

    return (
        <section>
            <h2>Add your review!</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label hidden htmlFor="content">Content</label>
                    <textarea
                    name="content" rows={4} cols={20}
                    id="content"
                    placeholder="What's your review?"
                    value={reviewData.content}
                    onChange={handleChange} >
                    </textarea>
                </div>

                <div className="button-group">
                    <Link to={`/movies/${movieId}`}>Cancel</Link>
                    <button type="submit" disabled={reviewData.content === ""}>
                        Post Review
                    </button>
                </div>
            </form>
        </section>

    )

}