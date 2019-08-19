<template>
  <v-layout wrap justify-center align-center>
    <v-flex xs12 sm10 md8 lg5 xl4>
      <resident-agreement-vue :residentAgreement="residentAgreement"></resident-agreement-vue>
    </v-flex>
    <v-flex xs12>
      <create-button-vue v-if="$store.getters.isAdmin"></create-button-vue>
    </v-flex>
    <v-flex xs12 sm10 md10>
      <announcement-vue :announcement="announcement"/>
    </v-flex>
  </v-layout>
</template>

<script>
import AnnouncementVue from "../components/Announcement";
import CreateButtonVue from "../components/CreateButton.vue";
import ResidentAgreementVue from "../components/ResidentAgreement.vue";

import firebase from "firebase";
import utilsFunc from "../components/utilsFunc";

export default {
  async asyncData({ store, req }) {
    // Fetching Announcement

    let returnData = {};

    await store.dispatch("initAuth", req);
    const ANref = firebase
      .app()
      .firestore()
      .collection("announcement");

    const announcement = await ANref.get();

    if (announcement.size > 0) {
      returnData = {
        ...returnData,
        announcement: announcement.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .sort(utilsFunc.latestDate)
      };
    } else {
      returnData = { ...returnData, announcement: [] };
    }

    const RAref = firebase
      .app()
      .firestore()
      .collection("residentAgreement")
      .doc("residentAgreement");

    const residentAgreement = await RAref.get();

    if (residentAgreement.exists) {
      returnData = { ...returnData, ...residentAgreement.data() };
    } else {
      const CreatedTime = new Date().getTime();
      RAref.set({
        residentAgreement: {
          content: "",
          createdAt: CreatedTime
        }
      });
      returnData = {
        ...returnData,
        residentAgreement: {
          content: "",
          createdAt: CreatedTime
        }
      };
    }

    return returnData;
  },

  data() {
    return {};
  },

  components: {
    AnnouncementVue,
    CreateButtonVue,
    ResidentAgreementVue
  }

  // computed: {
  //   reversedAnn() {
  //     return this.announcement.slice().reverse();
  //   }
  // }
};
</script>

<style scoped lang='scss'>
</style>
