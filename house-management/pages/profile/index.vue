<template>
  <v-layout row align-center justify-center class="cus-font">
    <v-flex>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>{{$store.getters.userEmail}}</v-toolbar-title>
        </v-toolbar>
        <v-list v-for="(item, index) in items" :key="item.title">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="itemContent">
              <span class="itemTitle">{{item.title}}</span>
              <span class="itemShow">{{item.show}}</span>
            </v-list-tile-content>
            <!-- <v-list-tile-action>
              <v-icon color="primary">edit</v-icon>
            </v-list-tile-action>-->
          </v-list-tile>
          <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
          <!--  -->

          <!--  -->
        </v-list>

        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <v-list-tile class="list_tile">
                <v-list-tile-action>
                  <v-icon color="primary">description</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <strong>Description</strong>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon color="primary">description</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <v-card>
              <v-card-text class="showDescription">{{description}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn round color="primary" dark v-on="on">Edit</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="name" label="Name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 lg6>
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedStartDateFormatted"
                        label="Starting Date"
                        persistent-hint
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="startingDate" no-title @input="menu1 = false"></v-date-picker>
                  </v-menu>
                  <p></p>
                </v-flex>

                <v-flex xs12 lg6>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="computedEndDateFormatted"
                        label="Ending Date"
                        persistent-hint
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="endingDate" no-title @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    :items="['Emma\'s Room','Fredic\'s Room','Richard\'s Room', 'CATS Room']"
                    label="Staying Room*"
                    required
                    v-model="stayingRoom"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Phone*" required v-model="phone"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea box label="Description" v-model="description"></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round color="primary" flat @click="dialogClose">Close</v-btn>
            <v-btn round color="primary" flat @click="dialogSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!--  -->
    </v-flex>
  </v-layout>
</template>

<script>
import db from "../../plugins/db";

export default {
  data() {
    return {
      name: "",
      menu1: false,
      menu2: false,
      dialog: false,
      startingDate: "",
      endingDate: "",
      stayingRoom: "",
      phone: "",
      description: ""
    };
  },

  // mounted() {
  //   const {
  //     name,
  //     startingDate,
  //     endingDate,
  //     stayingRoom,
  //     phone,
  //     description
  //   } = this.$store.getters.profileInfo;
  //   this.name = name;
  //   this.startingDate = startingDate;
  //   this.endingDate = endingDate;
  //   this.stayingRoom = stayingRoom;
  //   this.phone = phone;
  //   this.description = description;
  // },

  async asyncData({ store, redirect }) {
    let profileInfo = {};

    const email = store.getters.userEmail;
    if (!email) {
      return redirect("/");
    }
    const userDoc = await db
      .collection("users")
      .doc(email)
      .get();

    if (userDoc.exists) {
      profileInfo = userDoc.data();
    }

    return {
      name: profileInfo.name,
      startingDate: profileInfo.startingDate,
      endingDate: profileInfo.endingDate,
      stayingRoom: profileInfo.stayingRoom,
      phone: profileInfo.phone,
      description: profileInfo.description
    };
  },

  computed: {
    profileInfo() {
      return this.$store.getters.profileInfo;
    },

    computedEndDateFormatted() {
      return this.formatDate(this.endingDate);
    },
    computedStartDateFormatted() {
      return this.formatDate(this.startingDate);
    },

    items() {
      return [
        {
          icon: "account_circle",
          title: "Name ",
          show: this.name
        },
        {
          icon: "calendar_today",
          title: "Staying Dates",
          show: `${this.startingDate}  ~  ${this.endingDate}`
        },
        {
          icon: "meeting_room",
          title: "Staying Room",
          show: this.stayingRoom
        },
        {
          icon: "phone",
          title: "Phone",
          show: this.phone
        }
      ];
    }
  },

  middleware: ["auth"],
  methods: {
    formatDate(date) {
      if (!date) return null;

      if (date.includes("/")) {
        return date;
      }
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    dialogClose() {
      this.dialog = false;
    },
    async dialogSave() {
      await this.$store.dispatch("updateUserInfo", {
        name: this.name,
        startingDate: this.startingDate,
        endingDate: this.endingDate,
        stayingRoom: this.stayingRoom,
        phone: this.phone,
        description: this.description
      });
      this.dialog = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.list_tile {
  display: flex;
  justify-content: center;
}

.payment_button {
  border-radius: 25px;
  margin-top: 3rem;
  margin-right: 10rem;
  height: 4rem;
  width: 10rem;
  display: flex;
  align-items: center;
}

.itemTitle {
  display: inline-block;
  width: 20rem;
}

.itemShow {
  display: inline;
  border-bottom: 0.2px #593a3a solid;
}

.itemContent {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

.showDescription {
  white-space: pre-wrap;
  text-align: center;
}
</style>
