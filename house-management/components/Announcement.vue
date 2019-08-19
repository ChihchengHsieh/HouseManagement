<template>
  <v-timeline :dense="$vuetify.breakpoint.mdAndDown">
    <v-timeline-item color="primary" v-for="(ann, index) in announcement" :key="index">
      <template v-slot:opposite>
        <strong class="primary--text">{{formateTime(ann.createdAt)}}</strong>
      </template>
      <v-card class="elevation-5" color="primary" dark>
        <v-card-text class="white text--primary annText">{{ann.content}}</v-card-text>
        <strong v-if="$vuetify.breakpoint.mdAndDown" class="elevation-5">{{formateTime(ann.createdAt)}}</strong>
      </v-card>
      <delete-icon-vue v-if="$store.getters.isAdmin" :ann="ann"></delete-icon-vue>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import moment from "moment";
import DeleteIconVue from "./DeleteIcon.vue";
export default {
  props: ["announcement"],
  components: {
    DeleteIconVue
  },
  methods: {
    formateTime(time) {
      return moment(time).format("Do MMMM YYYY hh:mm a");
    }
  }
};
</script>

<style>
.annText {
  white-space: pre-wrap;
}
</style>
