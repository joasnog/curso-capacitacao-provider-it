import axios from "axios";

const baseURL = 'http://localhost:8088';

const api = axios.create({
    baseURL: baseURL,
});

export default api;

