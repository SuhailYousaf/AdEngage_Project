import axios from "axios"
const API = axios.create({ baseURL: "https://adengage.onrender.com" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    console.log("token client "+req.headers.Authorization)
    return req;
  });


export const signIn = (formData) => API.post("/login", formData)
export const signUp = (formData) => API.post("/register", formData)

export const createImage = (imageData) => API.post('/createImage', imageData)
export const getImages = () => API.get('/getImages')
export const getImage = (id) => API.get(`/getImage/${id}`);
export const getImagesBySearchAndColor = (searchQuery, selectedColor) =>
  API.get(`/image/search?searchQuery=${searchQuery}&color=${selectedColor}`);
