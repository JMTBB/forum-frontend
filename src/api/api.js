import axios from 'axios'

let prefix = '/proxy'


//登录注册

export const login = params => axios.post(`${prefix}/login`, params).then(res => res.data);
export const register = params => axios.post(`${prefix}/user`, params).then(res => res.data);