<template class="cus-font">
  <v-layout wrap align-start>
    <v-flex xs12 lg4>
      <v-card class="mx-auto" color="secondary">
        <v-card-title>
          <v-icon large left>home</v-icon>
          <strong class="cus-font title">Payment Information</strong>
        </v-card-title>
        <v-card-text class="headline font-weight-bold">
          <v-list v-for="(info, index) in paymentInfo" :key="index">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>{{info.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="payment_list">
                <strong class="cus-font payment_title">{{info.title}}</strong>
                <span class="cus-font payment_content">{{info.content}}</span>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < paymentInfo.length" :key="`divider-${index}`"></v-divider>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>

    <!-- Registering Payment Section  -->
    <!-- <v-layout row> -->
    <v-flex d-flex xs12 lg7 offset-lg1>
      <v-layout wrap>
        <v-flex xs12>
          <v-card class="mx-auto" color="secondary">
            <v-card-title>
              <strong class="title mt-3 ml-2 cus-font">Send Payment Request</strong>
            </v-card-title>
            <v-layout wrap justify-space-around align-content-center pt-3>
              <v-flex xs12 lg5>
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedStartDateFormatted"
                      label="Starting Date"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startingDate" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
                <p></p>
              </v-flex>

              <v-flex xs12 lg5>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedEndDateFormatted"
                      label="Ending Date"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endingDate" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs12 lg5 d-flex align-center>
                <v-icon large left>money</v-icon>
                <v-text-field v-model="total" label="Total Amount*" required></v-text-field>
                <span class="aud">AUD</span>
              </v-flex>
              <v-flex xs12 lg5 d-flex align-center mb-3>
                <v-btn
                  max-width="290px"
                  color="primary"
                  class="submitButton"
                  @click="submitReq"
                  required
                  round
                >Send</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>

        <v-flex xs12 mt-5>
          <v-card color="secondary">
            <v-card-title>
              <strong class="title mt-3 ml-2 cus-font">Payment Records</strong>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-tile>
                  <v-layout wrap justify-start align-center>
                    <v-flex xs3>
                      <v-list-tile-content>
                        <strong>Starting Date</strong>
                      </v-list-tile-content>
                    </v-flex>
                    <v-flex xs3>
                      <v-list-tile-content>
                        <strong>Ending Date</strong>
                      </v-list-tile-content>
                    </v-flex>
                    <v-flex xs3>
                      <v-list-tile-content>
                        <strong>Amount</strong>
                      </v-list-tile-content>
                    </v-flex>
                    <v-flex xs3>
                      <v-list-tile-content>
                        <strong>Status</strong>
                      </v-list-tile-content>
                    </v-flex>
                  </v-layout>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile v-for="(item, index) in paymentRecords" :key="index">
                  <v-layout wrap justify-start align-center>
                    <v-flex xs3>
                      <v-list-tile-content>{{item.startingDate}}</v-list-tile-content>
                    </v-flex>
                    <v-flex xs3>
                      <v-list-tile-content>{{item.endingDate}}</v-list-tile-content>
                    </v-flex>
                    <v-flex xs3>
                      <v-list-tile-content>{{item.total}}</v-list-tile-content>
                    </v-flex>
                    <v-flex xs3>
                      <v-list-tile-content>{{item.status}}</v-list-tile-content>
                    </v-flex>
                  </v-layout>
                </v-list-tile>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  <!-- </v-layout> -->
</template>

<script>
import firebase from "firebase";
import utilsFunc from "../../components/utilsFunc";
import db from '../../plugins/db'

export default {
  async asyncData({ store, req }) {
    await store.dispatch("initAuth", req);
    const ref = firebase
      .app()
      .firestore()
      .collection("paymentRecords")
      .where("email", "==", store.getters.userEmail);
    const paymentRecords = await ref.get();

    if (paymentRecords.size > 0) {
      return {
        paymentRecords: paymentRecords.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .sort(utilsFunc.latestDate)
      };
    } else {
      return { paymentRecords: [] };
    }
  },

  data() {
    return {
      menu1: false,
      menu2: false,
      startingDate: new Date().toISOString().substr(0, 10),
      endingDate: new Date().toISOString().substr(0, 10),
      total: "",
      headers: [
        {
          text: "Starting Date",
          value: "startingDate"
        },
        {
          text: "Ending Date",
          value: "endingDate"
        },
        {
          text: "Amount",
          value: "total"
        },
        {
          text: "Status",
          value: "status"
        }
      ],
      paymentInfo: [
        {
          title: "Name",
          content: "Sue",
          icon: "account_circle"
        },
        {
          title: "BSB",
          content: "064162",
          icon: "payment"
        },
        {
          title: "ACC",
          content: "11556489",
          icon: "payment"
        },
        {
          title: "Phone",
          content: "0426425498",
          icon: "phonelink_ring"
        }
      ]
    };
  },
  middleware: ["auth"],
  computed: {
    // reversedPaymentRecords() {
    //   return this.paymentRecords.slice().reverse();
    // },
    computedEndDateFormatted() {
      return this.formatDate(this.endingDate);
    },
    computedStartDateFormatted() {
      return this.formatDate(this.startingDate);
    }
  },
  methods: {
    async submitReq() {
      const ref = db.collection("paymentRecords").doc();

      await ref.set({
        startingDate: this.startingDate,
        endingDate: this.endingDate,
        total: this.total,
        status: "unconfirmed",
        createdAt: new Date().getTime(),
        room: this.$store.getters.userRoom,
        email: this.$store.getters.userEmail
      });
      window.location.reload(true);
    },
    formatDate(date) {
      if (!date) return null;

      if (date.includes("/")) {
        return date;
      }
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<style lang='scss' scoped>
.payment_title {
  width: 6rem;
}

.payment_content {
  margin: 0 auto;
}
.payment_list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

.aud {
  margin-left: 1rem;
}

.submitButton {
  margin: 0rem 5rem;
}
</style>

