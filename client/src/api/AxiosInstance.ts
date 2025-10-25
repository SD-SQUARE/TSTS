import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3658/m1/1104043-1094166-default/', // 🔁 change this
    headers: { 'Content-Type': 'application/json' },
});

export default api;
