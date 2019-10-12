import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

//Modules
import login from '@/store/modules/login'
import sede from '@/store/sede/sede'
import prestacion from '@/store/prestacion/prestacion'
import agenda from '@/store/agenda/agenda'

//configuracion
import {
  api
} from './helper/api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    sede,
    prestacion,
    agenda,
  },
  state: {
    connect: false,
    loading: false,
    api: api
  },
  getters: {
    api: state => state.api,
    loading: state => state.loading
  },
  mutations: {
    SET_LOADING: (state, payload) => state.loading = payload
  },
  actions: {
    index({state,commit}, payload) {
      commit('SET_LOADING', true)
      return new Promise((res, rej) => {
        state.api.get(payload.endpoint, {
            params: payload.params
          })
          .then((response) => {
            res(response.data)
          })
          .catch((error) => {
            rej(error)
          })
          .then(() => {
            commit('SET_LOADING', false)
          })
      });
    },
    store({state,commit}, payload) {
      commit('SET_LOADING', true)
      return new Promise((res, rej) => {
        state.api.post(payload.endpoint, payload.params)
          .then((response) => {
            res(response.data)
          })
          .catch((error) => {
            rej(error)
          })
          .then(() => {
            commit('SET_LOADING', false)
          })
      });
    },
    update({state,commit}, payload) {
      commit('SET_LOADING', true)
      return new Promise((res, rej) => {
        state.api.put(payload.endpoint, {
            params: payload.params
          })
          .then((response) => {
            res(response.data)
          })
          .catch((error) => {
            rej(error)
          })
          .then(() => {
            commit('SET_LOADING', false)
          })
      });
    },
    destroy({state,commit}, payload) {
      commit('SET_LOADING', true)
      return new Promise((res, rej) => {
        state.api.delete(payload.endpoint, {
            params: payload.params
          })
          .then((response) => {
            res(response.data)
          })
          .catch((error) => {
            rej(error)
          })
          .then(() => {
            commit('SET_LOADING', false)
          })
      });
    }
  }
})
