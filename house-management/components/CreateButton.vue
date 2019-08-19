<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="50%">
      <template v-slot:activator="{ on }">
        <v-btn round color="primary" v-on="on">Create</v-btn>
      </template>

      <v-card dark>
        <v-textarea
          height="50vh"
          dark
          outline
          autofocus
          label="New Announcement"
          class="newAnn"
          v-model="newAnn"
        ></v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round flat @click="dialog = false">Cancel</v-btn>
          <v-btn round flat @click="createAnn">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../plugins/db";

export default {
  data() {
    return {
      dialog: false,
      newAnn: ""
    };
  },

  methods: {
    async createAnn() {
      const ref = db.collection("announcement").doc();
      await ref.set({
        content: this.newAnn,
        createdAt: new Date().getTime()
      });
      this.dialog = false;
      window.location.reload(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.newAnn {
  height: 50vh;
}
</style>