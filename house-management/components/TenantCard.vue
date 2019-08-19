<template>
  <v-card color="primary" :to="`/admin-page/${tenant.user_id}?email=${tenant.email}`" dark>
    <v-card-title primary-title class="title" header>
      <v-layout column class="align-center justify-center">
        <div class="headline cus-font">{{tenant.name}}</div>
        <div class="grey--text emailText cus-font">{{tenant.email}}</div>
        <div class="grey--text emailText cus-font" ma-3>{{tenant.stayingRoom}}</div>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ["tenant"]
};
</script>

<style lang="scss" scoped>
.emailText {
  font-size: 1rem;
  margin-top: 1rem;
}
</style>
