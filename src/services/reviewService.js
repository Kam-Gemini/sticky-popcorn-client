import axios from "axios"
import { getToken } from "../utils/auth.js"

const BASE_URL = import.meta.env.VITE_API_URL

export const reviewIndex = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movies/${movieId}/reviews`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const reviewShow = async (movieId, reviewId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movies/${movieId}/reviews/${reviewId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error

    }
}

export const reviewPost = async (movieId, reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/movies/${movieId}/reviews`, reviewData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const reviewUpdate = async (movieId, reviewId, reviewData) => {
    try {
        const response = await axios.put(`${BASE_URL}/movies/${movieId}/reviews/${reviewId}/`, reviewData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const reviewDelete = async (movieId, reviewId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/movies/${movieId}/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        console.log(response)
    } catch (error) {
        console.log(error)
        throw error
    }
}