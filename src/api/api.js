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

//用户
export const getAvatar = params => axios.get(`${prefix}/avatar/${params}`);
export const updateExp = params => axios.get(`${prefix}/user/exp/${params}`)
export const getInfo = params => axios.get(`${prefix}/user/${params}`)
export const updateInfo = (id, payload) => axios.post(`${prefix}/user/${id}`, payload)
export const getAllUesr = () => axios.get(`${prefix}/user`);

//板块
export const boardAccess = params => axios.get(`${prefix}/limit/board/${params}`);
export const getAllBoards = () => axios.get(`${prefix}/board`);
export const getTabSeq = (threadId) => axios.get(`${prefix}/board/count/${threadId}`)
export const getManageBoards = userId => axios.get(`${prefix}/board/admin/${userId}`)
export const updateBoard = (board) => axios.put(`${prefix}/board`, board);
export const addBoard = (board) => axios.post(`${prefix}/board`, board);
export const deleteBoard = id => axios.delete(`${prefix}/board/${id}`);

//发帖
export const addThread = params => axios.post(`${prefix}/thread`, params);
export const getThreadById = params => axios.get(`${prefix}/thread/${params}`);
export const getThreadsByUserId = (userId, pageNumber) => axios.get(`${prefix}/threadinfo/${userId}/${pageNumber}`)
export const getThreads = (boardId, pageNumber) => axios.get(`${prefix}/threads/${boardId}/${pageNumber}`)
export const deleteThread = threadId => axios.delete(`${prefix}/thread/${threadId}`);
export const updateThread = (threadId, params) => axios.put(`${prefix}/thread/${threadId}`, params);
export const setTopThread = threadId => axios.put(`${prefix}/thread/top/${threadId}`)

//评论
export const addComment = params => axios.post(`${prefix}/comment`, params);
export const getCommentById = threadId => axios.get(`${prefix}/comments/${threadId}`)
export const getCommentsByUserId = userId => axios.get(`${prefix}/comments/user/${userId}`)
export const getCommentCounter = threadId => axios.get(`${prefix}/comment/counter/${threadId}`)
export const deleteComment = commentId => axios.delete(`${prefix}/comment/${commentId}`);

