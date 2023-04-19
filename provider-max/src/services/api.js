import axios from 'axios';

const api_key = 'b98249cab02541c83b1efefc931cf0ec';
const language = 'pt-BR';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: api_key,
        language: language,
    }
});

export default api;

