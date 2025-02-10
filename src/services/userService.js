import axios from "axios"


const BASE_URL = import.meta.enc.VITE_API_URL

//Signup API Service
export const signup = async (formData) => {

try {
    const res = await axios.post(BASE_URL + '/signup', formData)
    return res.formData
} catch (error) {
    console.log(error)
    throw error
}
}


