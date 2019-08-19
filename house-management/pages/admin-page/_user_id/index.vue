<template>
  <v-layout wrap align-start>
    <v-flex xs12 lg4>
      <user-info-card-vue :user="tenant"></user-info-card-vue>
    </v-flex>
    <v-flex xs12 lg7 offset-lg1>
      <payment-records-vue :paymentRecords="paymentRecords"></payment-records-vue>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import utilsFunc from "../../../components/utilsFunc";
import UserInfoCardVue from "../../../components/UserInfoCard.vue";
import PaymentRecordsVue from "../../../components/PaymentRecords.vue";

export default {
  async asyncData({ store, params, query, req }) {
    let tenant;
    let paymentRecords;
    const tenantDoc = await firebase
      .app()
      .firestore()
      .collection("users")
      .doc(query.email)
      .get();

    if (tenantDoc.exists) {
      tenant = tenantDoc.data();
    } else {
      tenant = {};
    }

    const paymentRecordsDoc = await firebase
      .app()
      .firestore()
      .collection("paymentRecords")
      .where("email", "==", query.email)
      .get();

    if (paymentRecordsDoc.size > 0) {
      paymentRecords = paymentRecordsDoc.docs
        .map(doc => ({ ...doc.data(), id: doc.id }))
        .sort(utilsFunc.latestDate);
    } else {
      paymentRecords = [];
    }
    return {
      tenant,
      paymentRecords
    };
  },

  middleware: ["adminAuth"],

  components: {
    UserInfoCardVue,
    PaymentRecordsVue
  }
};
</script>

<style>
</style>
