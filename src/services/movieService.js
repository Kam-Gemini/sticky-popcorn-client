import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL + '/movies'

export const movieIndex = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const movieShow = async (movieId) => {
  try {
    const res = await axios.get(BASE_URL + `/${movieId}`)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}