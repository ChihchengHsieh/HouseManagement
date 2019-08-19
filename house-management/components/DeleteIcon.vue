<template>
  <div>
    <v-dialog v-model="dialog" width="15vw">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark small absolute bottom right fab class="deleteIcon" v-on="on">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="cus-font title">Delete this post?</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" class="cus-font" flat @click="dialog = false">No</v-btn>
          <v-btn round color="primary" class="cus-font" flat @click="deletePost">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      dialog: false
    };
  },
  props: ["ann"],

  methods: {
    async deletePost() {
      const ref = firebase
        .app()
        .firestore()
        .collection("announcement")
        .doc(this.ann.id);
      await ref.delete()
      this.dialog = false;
      window.location.reload(true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>