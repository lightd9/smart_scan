import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: false, // or true if you're using cookies/auth
});
