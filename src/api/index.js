import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tiao.supliu.com.br/api',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'lucasrazebra@gmail.com'
    }
})


export default api;