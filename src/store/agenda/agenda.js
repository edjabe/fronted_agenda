export default {
  namespaced: true,
  state: {
      endpoint: 'disponibilidad',
      params: {},
      loading: false,
      agendas: [],
      agenda_id: null,
  },
  getters: {
      loading: state => state.loading,
      agendas: state =>  state.agendas,
      agenda_id: state =>  state.agenda_id,
      agendas_total: state => state.agendas_total,
      endpoint: state => state.endpoint,
      params: state => state.params,
      sede: state => state.agenda_id && !state.loading? $.grep(state.agendas, (el => {return el.id == state.agenda_id}))[0] : {}
  },
  mutations: {
      setLoading: (state, payload) => state.loading = payload,
      setAgendas: (state, payload) => {
          if(payload.replace) {
              state.agendas = []
          }

          payload.datos.forEach((element, i) => {
            state.agendas[i]= element[state.params.sede_id][state.params.prestacion_id];
          });

      },
      setAgendaId: (state, payload) => state.agenda_id = payload,
      setParams: (state, payload) => state.params = payload
  },
  actions: {
      index({commit}, payload) {
          let _replace = (payload?payload.replace:false);
          commit('setLoading', true)
          let data = new Promise((res, rej) => {
              this.getters.api.get(this.getters['agenda/endpoint'], {
                  params: this.getters['agenda/params']
              }).then(response =>
                  res(response.data)
              ).catch(error =>
                  rej(error)
              )
          });

          data.then((data) => {
              commit('setAgendas', {datos:data.disponibilidad, replace: _replace});
          }).catch(error=>{
              console.log(error)
          }).then(() => {
              commit('setLoading', false)
          });
      }
  }
}
