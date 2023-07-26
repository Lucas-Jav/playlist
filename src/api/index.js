import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tiao.supliu.com.br/api',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'lucasrazebra@gmail.com'
    }
})

api.get('/album').then((res) => {
    console.log(res.data.data[0].tracks)
})

export default api;