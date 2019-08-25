import Vue from 'vue'
import Vuex from 'vuex'
import ticketsAPI from '@/api/ticketsAPI';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loanTickets: [],
    isLoading: false
  },

  getters: {
    approvedTickets (state) {
      return state.loanTickets.filter(ticket => ticket.status == 1)
    }
  },
  mutations: {
    'REPAY_TICKETS' (state) {
      state.isLoading = true
      state.error = null
    },
    'REPAY_TICKETS_SUCCESS' (state, ticket) {
      state.isLoading = false
      state.error = null
    },
    'REPAY_TICKETS_ERROR' (state, error) {
      state.isLoading = false
      state.error = error
    },
    'ADD_TICKETS' (state) {
      state.isLoading = true
      state.error = null
    },
    'ADD_TICKETS_SUCCESS' (state, ticket) {
      state.isLoading = false
      state.error = null
    },
    'ADD_TICKETS_ERROR' (state, error) {
      state.isLoading = false
      state.error = error
    },
    'FETCH_TICKETS' (state) {
      state.isLoading = true
      state.error = null
    },
    'FETCH_TICKETS_SUCCESS' (state, tickets) {
      state.isLoading = false
      state.error = null
      state.loanTickets = tickets
    },
    'FETCH_TICKETS_ERROR' (state, error) {
      state.isLoading = false
      state.error = error
    },
    'APPROVE_TICKET' (state) {
      state.isLoading = true
      state.error = null
    },
    'APPROVE_TICKET_SUCCESS' (state, ticket) {
      state.isLoading = false
      state.error = null
      state.loanTickets.forEach(item => {
        if (item.id == ticket.id) {
          item.status = 1
        }
      })
    },
    'APPROVE_TICKET_ERROR' (state, error) {
      state.isLoading = false
      state.error = error
    },
    'REJECT_TICKET' (state) {
      state.isLoading = true
      state.error = null
    },
    'REJECT_TICKET_SUCCESS' (state, ticket) {
      state.isLoading = false
      state.error = null
      state.loanTickets.forEach(item => {
        if (item.id == ticket.id) {
          item.status = 2
        }
      })
    },
    'REJECT_TICKET_ERROR' (state, error) {
      state.isLoading = false
      state.error = error
    }
  },
  actions: {
    fetchLoanTickets ({ commit }) {
      commit('FETCH_TICKETS')
      return new Promise((resolve, reject) => {
        ticketsAPI.getTicketsAPI()
          .then(function (response) {
            resolve(response)
            commit('FETCH_TICKETS_SUCCESS', response)
          })
          .catch(function (err) {
            reject(err)
            commit('FETCH_TICKETS_ERROR', err)
          })
      })
    },
    approveTicket ({ commit, state }, ticketId) {
      commit('APPROVE_TICKET')
      return new Promise((resolve, reject) => {
        ticketsAPI.aprroveTicketAPI(ticketId)
          .then(function (response) {
            resolve(response)
            commit('APPROVE_TICKET_SUCCESS', response)
          })
          .catch(function (err) {
            reject(err)
            commit('APPROVE_TICKET_ERROR', err)
          })
      })
    },
    rejectTicket ({ commit, state }, ticketId) {
      commit('REJECT_TICKET')
      return new Promise((resolve, reject) => {
        ticketsAPI.rejectTicketAPI(ticketId)
          .then(function (response) {
            resolve(response)
            commit('REJECT_TICKET_SUCCESS', response)
          })
          .catch(function (err) {
            reject(err)
            commit('REJECT_TICKET_ERROR', err)
          })
      })
    },
    addTicket ({ commit, state }, ticket) {
      commit('ADD_TICKETS')
      return new Promise((resolve, reject) => {
        ticketsAPI.addTicketAPI(ticket)
          .then(function (response) {
            resolve(response)
            commit('ADD_TICKETS_SUCCESS', response)
          })
          .catch(function (err) {
            reject(err)
            commit('ADD_TICKETS_ERROR', err)
          })
      })
    },
    repayTicket ({ commit, state }, ticketId) {
      commit('REPAY_TICKETS')
      return new Promise((resolve, reject) => {
        ticketsAPI.repayTicketAPI(ticketId)
          .then(function (response) {
            resolve(response)
            commit('REPAY_TICKETS_SUCCESS', response)
          })
          .catch(function (err) {
            reject(err)
            commit('REPAY_TICKETS_ERROR', err)
          })
      })
    }
  }
})
