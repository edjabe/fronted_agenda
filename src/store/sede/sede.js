export default {
  namespaced: true,
  state: {
      endpoint: 'sedes',
      params: {
          page: 1,
          paginar: false
      },
      loading: false,
      sedes: [],
      sede_id: null,
  },
  getters: {
      loading: state => state.loading,
      sedes: state =>  state.sedes,
      sede_id: state =>  state.sede_id,
      sedes_total: state => state.sedes_total,
      endpoint: state => state.endpoint,
      params: state => state.params,
      sede: state => state.sede_id && !state.loading? $.grep(state.sedes, (el => {return el.id == state.sede_id}))[0] : {}
  },
  mutations: {
      setLoading: (state, payload) => state.loading = payload,
      setSedes: (state, payload) => {
          if(payload.replace) {
              state.sedes = []
          }

          state.sedes[0] = {
            'value' : null,
            'text' : 'Seleccione una sede',
            disabled: true
          }

          payload.datos.forEach((element, i) => {
            state.sedes[i+1] = {
              'value' : element.id,
              'text' : element.nombre
            }
          });


      },
      setSedeId: (state, payload) => state.sede_id = payload,
      setParams: (state, payload) => state.params = payload
  },
  actions: {
      index({commit}, payload) {
          let _replace = (payload?payload.replace:false);
          commit('setLoading', true)
          let data = new Promise((res, rej) => {
              this.getters.api.get(this.getters['sede/endpoint'], {
                  params: this.getters['sede/params']
              }).then(response =>
                  res(response.data)
              ).catch(error =>
                  rej(error)
              )
          });

          data.then((data) => {
              commit('setSedes', {datos:data.sedes, replace: _replace});
          }).catch(error=>{
              console.log(error)
          }).then(() => {
              commit('setLoading', false)
          });
      }
  }
}
