/**
 * Mocking client-server processing
 */
const tickets = [
  {
    id: 1,
    fullName: 'Hoang Tien',
    amount: 100,
    repayMonth: 6,
    rate: 3,
    status: 0, //   status: 0,    -----> 0 pending, 1 approved, 2 rejected
    weeklyRepayment: 4.3,
    totalRepayment: 103
  }
]

export default {
  getTicketsAPI () {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        // eslint-disable-next-line no-unused-expressions
        resolve(tickets)
      }, 500)
    })
  },
  aprroveTicketAPI (ticketId) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        tickets.forEach(function (item) {
          if (item.id === ticketId) {
            item.status = 1
            resolve(item)
          }
        })
      }, 500)
    })
  },
  rejectTicketAPI (ticketId) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        tickets.forEach(function (item) {
          if (item.id == ticketId) {
            item.status = 2
            resolve(item)
          }
        })
      }, 500)
    })
  },
  addTicketAPI (ticket) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        tickets.push(ticket)
        resolve(ticket)
      }, 500)
    })
  },
  repayTicketAPI (ticketId) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        tickets.forEach(function (item) {
          if (item.id == ticketId) {
            if (item.totalRepayment < item.weeklyRepayment) {
              item.totalRepayment = 0
              resolve(item)
            } else {
              item.totalRepayment = item.totalRepayment - item.weeklyRepayment
              resolve(item)
            }
          }
        })
      }, 500)
    })
  }
}
