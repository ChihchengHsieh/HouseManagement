<template>
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

        <!--  -->
        <v-list-tile v-for="(item, index) in paymentRecords" :key="index">
          <v-menu offset-y absolute max-width="170">
            <template v-slot:activator="{ on }">
              <v-layout wrap justify-start align-center v-on="on">
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
            </template>
            <v-list>
              <v-list-tile
                v-for="(menu, index) in menuItems"
                :key="index"
                @click="()=>{menu.func(item)}"
              >
                <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      menuItems: [
        { title: "Toggle Status", func: this.toggleStatus },
        {
          title: "Remove Request",
          func: this.removeRecord
        }
      ]
    };
  },

  methods: {
    async toggleStatus(item) {
      await firebase
        .app()
        .firestore()
        .collection("paymentRecords")
        .doc(item.id)
        .update({
          status: item.status === "confirmed" ? "unconfirmed" : "confirmed"
        });
      window.location.reload(true);
    },

    async removeRecord(item) {
      await firebase
        .app()
        .firestore()
        .collection("paymentRecords")
        .doc(item.id)
        .delete();
      window.location.reload(true);
    }
  },

  props: ["paymentRecords"],
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  }
};
</script>

<style>
</style>
