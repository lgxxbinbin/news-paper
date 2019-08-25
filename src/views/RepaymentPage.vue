<template>
  <div class="container repayment-wrapper">
    <div class="row">
      <div class="col-12">
        <h1>Loan Repayment</h1>
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
              <th scope="col">Current Remaining</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="approvedTickets.length == 0">
              <td colspan="7">No loan ticket at this moment</td>
            </tr>
            <tr v-else v-for="ticket in approvedTickets" v-bind:key="ticket.id">
              <td>{{ ticket.fullName }}</td>
              <td>{{ ticket.amount }}</td>
              <td>{{ ticket.rate }}</td>
              <td>{{ ticket.repayMonth }}</td>
              <td>{{ ticket.weeklyRepayment.toFixed(2) }}</td>
              <td>{{ ticket.totalRepayment.toFixed(2) }}</td>
              <td>
                <button
                  :disabled="ticket.totalRepayment == 0"
                  type="button"
                  class="btn btn-success mr-1"
                  @click="repayTicket(ticket.id)"
                >Repay</button>
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
  name: "repayment-page",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['approvedTickets'])
  },
  created() {
    this.fetchTickets();
  },
  mounted() {},
  methods: {
    ...mapActions({
      fetchLoanTickets: "fetchLoanTickets"
    }),
    repayTicket: function(id) {
      blockUI.blockUI();
      this.$store.dispatch('repayTicket', id)
      .then(function (response) {
        console.log('repay successfully ');
      })
      .catch(function(error) {
      })
      .then(function() {
        blockUI.unblockUI();
      })
    },
    fetchTickets: function () {
      let thisObj = this;
      blockUI.blockUI();
      this.fetchLoanTickets()
      .then(function (response) {
        console.log('123 ', thisObj.$store.getters.approvedTickets);
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
.repayment-wrapper {
  margin-top: 2%;
  h1 {
    color:#42b983;
    margin-bottom: 48px;
  }
  .table {
    td {
      vertical-align: middle;
    }
  }
}
</style>
