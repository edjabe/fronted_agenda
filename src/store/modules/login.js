import { getLocalUser } from '@/store/helper/auth'
import { setAuthorization } from '@/store/helper/general'

const user = getLocalUser();

export default {
    namespaced: true,
    state: {
        endpoint: 'login',
        params: {
            page: 1,
            paginar: true
        },
        loading: false,
        user: !!user? user.user : {},
        token: !!user? user.token : null,
        token_type: !!user? user.token_type : null,
        expire: !!user? user.expires_in : 0,
    },
    getters: {
        endpoint: (state) => state.endpoint,
        params: (state) => state.params,
        loading: (state) => state.loading,
        user: (state) => state.user,
        token: (state) => state.token,
        token_type: (state) => state.token_type,
        expire: (state) => state.expire,
    },
    mutations: {
        setParams: (state, payload) => state.params = payload,
        setLoading: (state, payload) => state.loading = payload,
        setUser: (state, payload) => state.user = payload,
        setToken: (state, payload) => state.token = payload,
        setTokenType: (state, payload) => state.token_type = payload,
        setExpire: (state, payload) => state.expire = payload
    },
    actions: {
        login ({commit, state}, payload) {
            return new Promise((res, rej) => {
                this.dispatch('store', {endpoint: state.endpoint, params: payload})
                .then((data) => {
                    localStorage.setItem("user", JSON.stringify(data));
                    commit('setUser', data.user)
                    commit('setToken', data.token)
                    commit('setTokenType', data.token_type)
                    commit('setExpire', data.expires_in)
                    setAuthorization(data.token)
                    res(data)
                }).catch(error => {
                    rej(error.response)
                })
            });
        },
        refresh ({commit, state}, payload) {
            return new Promise((res, rej) => {
                this.dispatch('store', {endpoint: state.endpoint + '/refresh', params: payload})
                .then((data) => {
                    commit('setToken', data.access_token)
                    commit('setTokenType', data.token_type)
                    commit('setExpire', data.expires_in)
                    res(data)
                }).catch(error => {
                    rej(error.response)
                })
            });
        },
        logout ({commit, state}, payload) {
            return new Promise((res, rej) => {
                this.dispatch('store', {endpoint: state.endpoint + '/logout', params: payload})
                .then((data) => {
                    commit('setUser', {})
                    commit('setToken', null)
                    commit('setTokenType', null)
                    commit('setExpire', 0)
                    localStorage.removeItem("user")
                    res(data)
                }).catch(error => {
                    rej(error.response)
                })
            });
        },
        user ({commit, state}, payload) {
            return new Promise((res, rej) => {
                this.dispatch('store', {endpoint: state.endpoint + '/me', params: payload})
                .then((data) => {
                    commit('setUser', data)
                    res(data)
                }).catch(error => {
                    rej(error.response)
                })
            });
        }
    }
}
