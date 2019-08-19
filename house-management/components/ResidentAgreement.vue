<template>
  <v-card >
    <v-card-title primary-title class="title justify-center" header>
      <div>
        <div class="headline cus-font">Resident Agreement</div>
        <span class="grey--text createdTime cus-font">{{formateTime(residentAgreement.createdAt)}}</span>
      </div>
    </v-card-title>
    <v-card-text class="agreementText   cus-font">{{residentAgreement.content}}</v-card-text>
    <AgreementEditIconVue v-if="$store.getters.isAdmin" :content="residentAgreement.content" ></AgreementEditIconVue>
  </v-card>
</template>

<script>
import moment from "moment";
import AgreementEditIconVue from "./AgreementEditIcon.vue";

export default {
  props: ["residentAgreement"],

  components: {
    AgreementEditIconVue
  },

  methods: {
    formateTime(time) {
      return moment(time).format("Do MMMM YYYY h:mm a");
    }
  }
};
</script>

<style lang='scss'>
.agreementText {
  white-space: pre-wrap;
}

.createdTime {
    font-size: 1rem;
}
</style>
