import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
    timeout: 10000,
})
instance.interceptors.request.use( function (config){
    var token = localStorage.getItem('token');
    var userId = localStorage.getItem('userId');
    if(token === null || userId === null) return config
    config.headers['Authorization'] = `${userId} ${ token }`;
    return config
})
export default instance