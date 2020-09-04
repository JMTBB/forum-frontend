import axios from 'axios'
import store from '../store'

let prefix = '/proxy'

axios.interceptors.response.use(    //response interceptor: catch the response error
    res => {
        if (res.status === 200) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    },
    err => {
        console.log('======\n' + err + '\n======');
        store.commit('showMessage', { content: err, color: 'error' });
        return Promise.resolve(err);

    }
)
axios.interceptors.request.use(     //add user tokan while sending a request
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    err => Promise.reject(err)
)



//登录注册

export const login = params => axios.post(`${prefix}/login`, params);
export const register = params => axios.post(`${prefix}/register`, params);
export const getAvatar = params => axios.get(`${prefix}/avatar/${params}`);

//获取可发帖板块
export const boardAccess = params => axios.get(`${prefix}/limit/board/${params}`);



//发帖
export const addThread = params => axios.post(`${prefix}/thread`, params);
export const getThreadById = params => axios.get(`${prefix}/thread/${params}`);