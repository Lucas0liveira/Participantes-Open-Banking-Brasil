import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => ({
  filters: {
    roles: [],
    status: '',
  },
  showFilter: false,
})
const state = initialState()

const getters = {
  getFilters: (state) => state.filters,
}

const mutations = {
  updateFilters: (state, payload) => {
    state.filters = payload
  },
  updateShowFilter: (state, payload) => {
    state.showFilter = payload
  },
}

const actions = {
  resetFilters({ commit }) {
    const cleanFilters = initialState().filters
    commit('updateFilters', cleanFilters)
  },
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

export default store
