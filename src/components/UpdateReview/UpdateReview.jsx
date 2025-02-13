import { useEffect, useState, useContext } from "react"
import { UserContext } from "../../contexts/UserContext.jsx"
import { useNavigate, useParams, Link } from "react-router"
import { reviewUpdate, reviewShow } from "../../services/reviewService.js"


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
        <section>
            <h2>Update your review!</h2>
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
                    <Link to={`/movies/${movieId}/reviews/${reviewId}`}>Cancel</Link>
                    <button type="submit" disabled={reviewData.content === ""}>
                        Update Review
                    </button>
                </div>
            </form>
        </section>

    )

}