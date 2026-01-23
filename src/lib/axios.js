import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.Vite_API_URL,
    timeout: 1000,
});
export default api;