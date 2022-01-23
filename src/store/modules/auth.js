import axios from 'axios';

const state = {
    // check if admin has non-inspired token
    token: localStorage.getItem('token') || '',
    expiration: localStorage.getItem('expiration') || null,
    admin: null,
    data: null
};
const getters = {
    isAuthenticated: state => !!state.token && state.expiration > Date.now(),
    data: state => state.data
};
const actions = {
    async LogIn({commit}, formData) {
        let res = await axios.post('admin/login', formData)        
        let data = res.data
        axios.defaults.headers.common['Authorization'] = data.access_token
        await commit('setAdmin', data)        
    },
    async LogOut({commit}){
        localStorage.setItem('token', null)
        localStorage.setItem('expiration', null)
        await commit('logout')
    },
    async GetUsers({commit}) {
        let res = await axios.get('users')
        let data = res.data.data
        await commit('setData', data)
    },
    async EditUser({commit}, Data){
        await axios.patch('user', Data)
        let res = await axios.get('users')
        let data = res.data.data
        await commit('setData', data)
    },
    async DeleteUser({commit}, Data){
        await axios.delete('user', {data: Data})
        let res = await axios.get('users')
        let data = res.data.data
        await commit('setData', data)
    },
    async CreateUser({commit}, Data){
        await axios.post('user', Data)
        let res = await axios.get('users')
        let data = res.data.data
        await commit('setData', data)
    }
};
const mutations = {
    setAdmin(state, data){
        // data contains information about token inspiration time
        let expirationDate = Date.now() + data.expires_in
        localStorage.setItem('token', data.access_token)        
        localStorage.setItem('expiration', expirationDate)
        console.log('stored',localStorage.expiration)
        state.admin = data.admin
        state.expiration = expirationDate
        state.token = data.access_token
    },
    LogOut(state){
        state.admin = null
        state.token = null
        state.expiration = null
    },
    setData(state, data) {
        state.data = data
    }
};
export default {
  state,
  getters,
  actions,
  mutations
};
