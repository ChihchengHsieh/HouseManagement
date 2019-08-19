<template>
  <div>
    <v-layout wrap justify-space-around="">
      <v-flex xs8 ma-5 lg4 v-for="(tenant, index) in tenants" :key="index">
        <tenant-card-vue :tenant="tenant"></tenant-card-vue>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import firebase from "firebase";
import TenantCardVue from "../../components/TenantCard.vue";

export default {
  async asyncData({ route, store, req }) {
    const tenantDoc = await firebase
      .app()
      .firestore()
      .collection("users")
      .get();

    if (tenantDoc.size > 0) {
      const tenants = tenantDoc.docs.map(doc => doc.data());
      return { tenants };
    }
  },
  middleware: ["adminAuth"],

  components: {
    TenantCardVue
  }
};
</script>

<style>
</style>
