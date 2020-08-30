import axios from 'axios'
import store from '../store'

let prefix = '/proxy'

axios.interceptors.response.use(    //response interceptor: catch the response error
    res => {
        console.log('coming...')
        if (res.status != 200) {

            console.log(res);
            store.commit('showMessage', { content: res.statusText, color: 'error' });
            return Promise.resolve(res)
        }

    },
    err => {
        console.log('======\n' + err + '\n======');
        store.commit('showMessage', { content: err, color: 'error' });
        return Promise.resolve(err);

    }
)
// axios.interceptors.request.use(     //add user tokan while sending a request
//     config => {
//         if (localStorage.getItem('Authorization')) {
//             config.headers.Authorization = localStorage.getItem('Authorization');
//         }
//         return config;
//     },
//     err => Promise.reject(err)
// )



//登录注册

export const login = params => axios.post(`${prefix}/login`, params).then(res => res.data);
export const register = params => axios.post(`${prefix}/user`, params).then(res => res.data);