import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-37d9f-default-rtdb.firebaseio.com/'
})

export default instance;