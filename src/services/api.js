import axios from 'axios';

export default axios.create({
    baseURL: 'https://apiprojetongcash.vercel.app/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});
