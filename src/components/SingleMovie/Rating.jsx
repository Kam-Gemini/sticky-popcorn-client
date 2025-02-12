import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import styles from './SingleMovie.module.css'

export default function MovieRating() {
  const [rating, setRating] = useState('')

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
  }
  console.log(rating)
  return (
    <div className={styles.rating}>
      <Rating onClick={handleRating} ratingValue={setRating}/>
    </div>
  )
}