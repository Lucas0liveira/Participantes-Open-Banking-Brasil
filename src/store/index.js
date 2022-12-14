import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => ({
  filters: {
    roles: [],
    status: '',
  },
  showFilter: false,
  showMenu: false,
  showDetails: false,
  detailedOrganisation: {},
  isLoading: false,
})
const state = initialState()

const getters = {
  getFilters: (state) => state.filters,
  getDetailedOrganisation: (state) => state.detailedOrganisation,
}

const mutations = {
  updateFilters: (state, payload) => {
    state.filters = payload
  },
  updateShowFilter: (state, payload) => {
    state.showFilter = payload
  },
  updateShowMenu: (state, payload) => {
    state.showMenu = payload
  },
  updateShowDetails: (state, payload) => {
    state.showDetails = payload
  },
  updateDetailedOrganisation: (state, payload) => {
    state.detailedOrganisation = payload
  },
  updateIsLoading: (state, payload) => {
    state.isLoading = payload
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
