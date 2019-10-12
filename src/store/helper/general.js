import {
  api
} from './api'

export function initialize(store, router) {

  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.currentUser;

    if (to.path != '/pages/login' && !store.state.login.token) {
      next('/');
    } else if (to.path == '/pages/login' && store.state.login.token) {
      next('/dashboard');
    }

    next();
  });

  api.interceptors.request.use((config) => {
    return config
  })

  api.interceptors.response.use(null, (error) => {
    if (error.response.status == 401) {
      localStorage.removeItem("user")
      store.commit('login/setUser', {})
      store.commit('login/setToken', null)
      store.commit('login/setTokenType', null)
      store.commit('login/setExpire', 0)
      router.push('/')
    }

    return Promise.reject(error);
  })

  if (store.state.login.token) {
    setAuthorization(store.state.login.token)
  }
}

export function setAuthorization(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
