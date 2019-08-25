<template>
  <div class="container approve-wrapper">
    <div class="row">
      <div class="col-12">
        <h1>Approve Ticket Management</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Amount $</th>
              <th scope="col">Rate %</th>
              <th scope="col">Months</th>
              <th scope="col">Weekly Repayment</th>
              <th scope="col">Total Repayment</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ticket in tickets" v-bind:key="ticket.id">
              <td>{{ ticket.fullName }}</td>
              <td>{{ ticket.amount }}</td>
              <td>{{ ticket.rate }}</td>
              <td>{{ ticket.repayMonth }}</td>
              <td>{{ ticket.weeklyRepayment.toFixed(2) }}</td>
              <td>{{ ticket.totalRepayment.toFixed(2) }}</td>
              <td v-if="ticket.status == 0">Pending</td>
              <td v-else-if="ticket.status == 1">Aprroved</td>
              <td v-else-if="ticket.status == 2">Rejected</td>
              <td>
                <button :disabled="!(ticket.status == 0)"  type="button" class="btn btn-success mr-1" @click="approveTicket(ticket.id)" >Aprrove</button>
                <button :disabled="!(ticket.status == 0)" type="button" class="btn btn-warning" @click="rejectTicket(ticket.id)">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import blockUI from './../utils/blockui.js';

export default {
  name: "approve-page",
  components: {},
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState({
      tickets: state => state.loanTickets
    })
  },
  created() {
    this.fetchTickets();
  },
  mounted() {},
  methods: {
    ...mapActions({
      fetchLoanTickets: "fetchLoanTickets"
    }),
    approveTicket: function (id) {
      blockUI.blockUI();
      this.$store.dispatch('approveTicket', id)
      .then(function (response) {
        console.log('approve successfully ', response);
      })
      .catch(function(error) {
      })
      .then(function() {
        blockUI.unblockUI();
      })
    },
    rejectTicket: function (id) {
      blockUI.blockUI();
      this.$store.dispatch('rejectTicket', id)
      .then(function (response) {
        console.log('reject successfully ');
      })
      .catch(function(error) {
      })
      .then(function() {
        blockUI.unblockUI();
      })
    },
    fetchTickets: function () {
      blockUI.blockUI();
      this.fetchLoanTickets()
      .then(function (response) {
      })
      .catch(function (error) {
      })
      .then(function() {
        blockUI.unblockUI();
      })
    }
  }
};
</script>

<style scoped lang="less">
.approve-wrapper {
  margin-top: 2%;
  h1 {
    color:#42b983;
    margin-bottom: 48px;
  }
  .card-item {
    text-align: left;
  }
  .table {
    td {
      vertical-align: middle;
    }
  }
}
</style>
