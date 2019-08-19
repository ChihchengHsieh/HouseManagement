<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="50%">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark small absolute bottom right fab class="deleteIcon" v-on="on">
          <v-icon>edit</v-icon>
        </v-btn>
      </template>

      <v-card dark>
        <v-textarea
          height="50vh"
          dark
          outline
          autofocus
          label="Edit Agreement"
          class="editAgreement"
          v-model="contentClone"
        ></v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round flat @click="dialog = false">Cancel</v-btn>
          <v-btn round flat @click="editAgreement">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["content"],

  data() {
    return {
      dialog: false,
      contentClone: this.content
    };
  },
  methods: {
    async editAgreement() {
      const ref = firebase
        .app()
        .firestore()
        .collection("residentAgreement")
        .doc("residentAgreement");

      await ref.set({
        residentAgreement: {
          content: this.contentClone,
          createdAt: new Date().getTime()
        }
      });

      this.dialog = false;
      window.location.reload(true);
    }
  }
};
</script>

<style>
.editAgreement {
  height: 50vh;
}
</style>
