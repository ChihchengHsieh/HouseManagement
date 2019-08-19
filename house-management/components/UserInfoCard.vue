<template>
  <v-card class="mx-auto" color="secondary">
    <v-card-title>
      <v-icon large left>fa-user</v-icon>
      <strong class="title cus-font">Tenant Profile</strong>
    </v-card-title>
    <v-card-text class="headline font-weight-bold">
      <v-list v-for="(info, index) in userInfo" :key="index" two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>{{info.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content >
            <v-layout column >
              <v-flex xs12 >
                <strong class="cus-font">{{info.title}}</strong>
              </v-flex  >
              <v-flex xs12 >
                <span class="cus-font">{{info.content}}</span>
              </v-flex>
            </v-layout>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < userInfo.length" :key="`divider-${index}`"></v-divider>
      </v-list>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <v-list-tile class="descriptionTile">
              <v-list-tile-action>
                <v-icon color="primary">description</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <strong class="cus-font">Description</strong>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="primary">description</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
          <v-divider></v-divider>
          <v-card>
            <v-card-text pa-3 class="showDescription cus-font">{{user.description}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: ["user"],
  computed: {
    userInfo() {
      return [
        {
          title: "Name",
          content: this.user.name,
          icon: "fa-campground"
        },
        {
          title: "Email",
          content: this.user.email,
          icon: "fa-envelope"
        },
        {
          title: "Phone",
          content: this.user.phone,
          icon: "fa-phone"
        },
        {
          title: "Staying Room",
          content: this.user.stayingRoom,
          icon: "fa-bed"
        },
        {
          title: "Staying Date",
          content: `${this.formateDate(
            this.user.startingDate
          )} ~ ${this.formateDate(this.user.endingDate)}`,
          icon: "fa-calendar-day"
        }
      ];
    }
  },

  methods: {
    formateDate(date) {
      return moment(date).format("Do MMMMM YYYY");
    }
  }
};
</script>

<style lang='scss' scoped>

.tileContent{
    height: 5vh !important;
}
.descriptionTile {
  display: flex;
  justify-content: center;
}

.showDescription {
  white-space: pre-wrap;
  text-align: center;
}
</style>
