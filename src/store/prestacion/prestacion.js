export default {
  namespaced: true,
  state: {
      endpoint: 'prestaciones',
      params: {},
      loading: false,
      prestaciones: [],
      prestacion_id: null,
  },
  getters: {
      loading: state => state.loading,
      prestaciones: state =>  state.prestaciones,
      prestacion_id: state =>  state.prestacion_id,
      prestaciones_total: state => state.prestaciones_total,
      endpoint: state => state.endpoint,
      params: state => state.params,
      sede: state => state.prestacion_id && !state.loading? $.grep(state.prestaciones, (el => {return el.id == state.prestacion_id}))[0] : {}
  },
  mutations: {
      setLoading: (state, payload) => state.loading = payload,
      setPrestaciones: (state, payload) => {
          if(payload.replace) {
              state.prestaciones = []
          }
          state.prestaciones[0] = {
            'value' : null,
            'text' : 'Seleccione una prestación',
            disabled: true
          }

          payload.datos.forEach((element, i) => {
            state.prestaciones[i+1] = {
              'value' : element.id,
              'text' : element.nombre
            }
          });


      },
      setPrestacionId: (state, payload) => state.prestacion_id = payload,
      setParams: (state, payload) => state.params = payload
  },
  actions: {
      index({commit}, payload) {
          let _replace = (payload?payload.replace:false);
          commit('setLoading', true)
          let data = new Promise((res, rej) => {
              this.getters.api.get(this.getters['prestacion/endpoint'], {
                  params: this.getters['prestacion/params']
              }).then(response =>
                  res(response.data)
              ).catch(error =>
                  rej(error)
              )
          });

          data.then((data) => {
              commit('setPrestaciones', {datos:data.prestaciones, replace: _replace});
          }).catch(error=>{
              console.log(error)
          }).then(() => {
              commit('setLoading', false)
          });
      }
  }
}
