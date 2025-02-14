import axios from "axios"
import { getToken } from "../utils/auth"

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

export const userFavouritesShow = async () => {
  try {
    const res = await axios.get(BASE_URL + `/favourites`, {
      headers: {
          Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(res.data)    
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const userWatchlistShow = async () => {
  try {
    const res = await axios.get(BASE_URL + `/watchlist`, {
      headers: {
          Authorization: `Bearer ${getToken()}`
      }
  })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addUserFavourite = async (movieId) => {
  try {
    const res = await axios.put(BASE_URL + `/${movieId}/favourites`, null, {
      headers: {
          Authorization: `Bearer ${getToken()}`
      }
  })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addUserWatchlist = async (movieId) => {
  try {
    const res = await axios.put(BASE_URL + `/${movieId}/watchlist`, null, {
      headers: {
          Authorization: `Bearer ${getToken()}`
      }
  })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
