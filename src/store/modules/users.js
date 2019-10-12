export default {
  namespaced: true,
  state: {
      endpoint: 'user',
      params: {
          page: 1,
          paginar: 0
      },
      loading: false,
      users: [],
  },
  getters: {
      endpoint: (state) => state.endpoint,
      params: (state) => state.params,
      loading: (state) => state.loading,
      users: (state) => state.users
  },
  mutations: {
      setParams: (state, payload) => state.params = payload,
      setLoading: (state, payload) => state.loading = payload,
      setUsers: (state, payload) => state.users = payload
  },
  actions: {
      index ({ commit, state }, payload) {
          commit('setLoading', true)
          let response = new Promise((res, rej) => {
              this.getters.api.get(state.endpoint, payload)
              .then(response => {
                  res(response.data)
              }).catch(error =>
                  rej(error)
              )
          })

          response.then(data => {
              commit('setusers', data)
          }).catch(error => {
              console.log(error)
          }).then(() => {
              commit('setLoading', false)
          })
      }
  }
}
