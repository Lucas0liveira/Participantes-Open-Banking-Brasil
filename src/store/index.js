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
  removeRoleFilter({ commit, state }, role) {
    const filteredRoles = state.filters.roles.filter((r) => r !== role)
    commit('updateFilters', {
      roles: filteredRoles,
      status: state.filters.status,
    })
  },
  removeStatusFilter({ commit, state }) {
    commit('updateFilters', { roles: state.filters.roles, status: '' })
  },
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

export default store
