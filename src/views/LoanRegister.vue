  <template>
  <div class="container loan-register">
    <div class="row">
      <div class="col-12">
        <h1>Loan Register</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form v-on:submit.prevent="loanRegister">
          <div class="form-group row">
            <label for="fullName" class="col-sm-2 col-form-label">Full name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="fullName"
                ref="fulNname"
                v-model="loanTicket.fullName"
              />
            </div>
          </div>

          <div class="form-group row">
            <label for="amountLoan" class="col-sm-2 col-form-label">Amount ($)</label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="amountLoan"
                ref="amountLoan"
                v-model="loanTicket.amount"
              />
            </div>
          </div>

          <fieldset class="form-group">
            <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Loan Terms</legend>
              <div class="col-sm-10">
                <div class="box-month">
                  <ul ref="repayMonth">
                    <li class="active">
                      <a href="javascript:void(0)" @click="getRepayMonth(6)">6 months</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="getRepayMonth(12)">12 months</a>
                    </li>
                  </ul>
                </div>
                <div class="box-term">
                  <ul class="table">
                    <li>
                      <aside>Amount</aside>
                      <aside>{{ loanTicket.amount }}</aside>
                    </li>
                    <li>
                      <aside>Rate</aside>
                      <aside>3%</aside>
                    </li>
                    <li>
                      <aside>Weekly Repayment</aside>
                      <aside>{{ loanTicket.weeklyRepayment }}</aside>
                    </li>
                    <li>
                      <aside>Requirement Paper</aside>
                      <aside>Id, Passport card</aside>
                    </li>
                    <li>
                      <aside>Total Repayment</aside>
                      <aside>{{ loanTicket.totalRepayment }}</aside>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </fieldset>

          <div class="form-group row">
            <label class="col-sm-2 col-form-label"></label>
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import blockUI from './../utils/blockui.js';

export default {
  name: "news-page",
  components: {},
  data() {
    return {
      loanTicket: {
        id: null,
        fullName: "",
        amount: 0,
        repayMonth: 6,
        rate: 3,
        status: 0,
        weeklyRepayment: 0,
        totalRepayment: 0
      },
    };
  },
  watch: {
    "loanTicket.amount": function(newVal, oldVal) {
      if (newVal != oldVal) {
        let amountRate,
          amount,
          weeklyAmount = 0;

        if (this.loanTicket.repayMonth == 6) {
          amount = parseFloat(this.loanTicket.amount);
          amountRate = parseFloat(
            (this.loanTicket.amount * this.loanTicket.rate) / 100);
          this.loanTicket.weeklyRepayment = parseFloat((amount + amountRate) / 24).toFixed(2);
          this.loanTicket.totalRepayment = parseFloat(amount + amountRate).toFixed(2);

        } else if (this.loanTicket.repayMonth == 12) {
          amount = parseFloat(this.loanTicket.amount);
          amountRate = parseFloat(
            (this.loanTicket.amount * this.loanTicket.rate) / 100
          );
          weeklyAmount = (amount + amountRate) / 48;
          this.loanTicket.weeklyRepayment = parseFloat(weeklyAmount).toFixed(2);
          this.loanTicket.totalRepayment = parseFloat(amount + amountRate).toFixed(2);

        }
      }
    }
  },
  computed: {
  },
  created() {},
  mounted() {
    this.addClass();
  },
  methods: {
    addClass: function() {
      $(".box-month ul li a").click(function() {
        $(".box-month ul li").removeClass("active");
        $(this)
          .parent()
          .addClass("active");
      });
    },
    getRepayMonth: function(month) {
      this.addClass();
      this.loanTicket.repayMonth = month;

      let amountRate,
          amount,
          weeklyAmount = 0;
        if (this.loanTicket.repayMonth == 6) {

          amount = parseFloat(this.loanTicket.amount);
          amountRate = parseFloat(
            (this.loanTicket.amount * this.loanTicket.rate) / 100);

          this.loanTicket.weeklyRepayment = parseFloat((amount + amountRate) / 24).toFixed(2);
          this.loanTicket.totalRepayment = parseFloat(amount + amountRate).toFixed(2);
        } else if (this.loanTicket.repayMonth == 12) {

          amount = parseFloat(this.loanTicket.amount);
          amountRate = parseFloat(
            (this.loanTicket.amount * this.loanTicket.rate) / 100
          );
          weeklyAmount = (amount + amountRate) / 48;
          this.loanTicket.weeklyRepayment = parseFloat(weeklyAmount).toFixed(2);
          this.loanTicket.totalRepayment = parseFloat(amount + amountRate).toFixed(2);
        }
    },
    loanRegister: function() {
      let thisObj = this;
      this.loanTicket.fullName = this.$refs.fulNname.value;
      this.loanTicket.amount = this.$refs.amountLoan.value;
      this.loanTicket.id = uuid.v1();
      
      blockUI.blockUI();
      this.$store.dispatch('addTicket', this.loanTicket)
      .then(function (response) {
        console.log('add successfully ');
        thisObj.loanTicket =  {
            id: null,
            fullName: "",
            amount: 0,
            repayMonth: 6,
            rate: 3,
            status: 0,
            weeklyRepayment: 0,
            totalRepayment: 0
        }
      })
      .catch(function(error) {
      })
      .then(function() {
        blockUI.unblockUI();
      })
    }
  }
};
</script>

<style scoped lang="less">
.loan-register {
  margin-top: 2%;
  h1 {
    color:#42b983;
    margin-bottom: 48px;
  }
  .submit {
    min-width: 200px;
  }
  .box-month {
    display: block;
    overflow-x: auto;
    width: 100%;
    padding-bottom: 20px;
    ul {
      list-style: none;
      padding-left: 0;
      li {
        float: left;
        width: 120px;
        background: #fff;
        position: relative;
        padding: 0;
        margin: 0 10px 0 0;
        border: 1px solid #ddd;
        border-radius: 3px;

        a {
          display: block;
          overflow: hidden;
          padding: 10px 0;
          text-align: center;
          font-size: 16px;
          text-decoration: none;
          color: #333;
        }
      }
      .active {
        border-color: #f5a623;
        box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.15);
        a {
          color: #4a90e2;
        }
      }
    }
  }
  .box-term {
    display: block;
    overflow: hidden;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    .table {
      padding-left: 0;
      margin-bottom: 0;
      li {
        display: table;
        width: 100%;
        background: #f1f1f1;
        border-bottom: 1px solid #ddd;
        aside {
          display: table-cell;
          width: 33.33%;
          padding: 12px 5px;
        }
        aside:nth-child(2n) {
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
      li:nth-child(2n) {
        background: #fff;
      }
    }
  }
}
</style>
