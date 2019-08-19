<template>
  <v-app light>
    <v-navigation-drawer
      class="drawer_list"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile v-for="(item, i) in filtered_drawer" :key="i" :to="item.to" router exactl>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="cus-font" v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar :clipped-left="clipped" fixed app color="#ec9194" prominent>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <nuxt-link
        class="cus-font house-title"
        :class="{'mobileTitle ':$vuetify.breakpoint.smAndDown}"
        to="/"
        router
      >
        CATS HOUSE
        <v-icon color="black" class="hidden-sm-and-down pawIcon">fa-paw</v-icon>
      </nuxt-link>
      <v-spacer/>
      <v-btn
        color="primary"
        class="cus-font"
        to="/auth/login"
        round
        v-if="!$store.getters.isLogin"
      >Login</v-btn>
      <v-btn
        color="primary"
        class="cus-font"
        to="/auth/signup"
        v-if="!$store.getters.isLogin"
        round
      >Sign Up</v-btn>
      <v-btn
        color="primary"
        class="cus-font"
        @click.stop="logoutUser"
        v-if="$store.getters.isLogin"
        round
      >Log Out</v-btn>
    </v-toolbar>
    <v-content class="back cus-font">
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "House Management"
    };
  },

  computed: {
    filtered_drawer() {
      return this.items.filter(i => i.ifStatement);
    },

    items() {
      return [
        {
          icon: "fa-user-circle",
          title: this.$store.getters.userEmail,
          to: "/profile",
          ifStatement: this.$store.getters.isLogin
        },
        {
          icon: "fa-home",
          title: "Landing Page",
          to: "/",
          ifStatement: true
        },
        {
          icon: "fa-camera-retro",
          title: "House Gallery",
          to: "/house-gallery",
          ifStatement: true
        },
        {
          icon: "fa-comment-dollar",
          title: "Payment",
          to: "/payment",
          ifStatement: this.$store.getters.isLogin
        },
        {
          icon: "fa-crown",
          title: "Admin Page",
          to: "/admin-page",
          ifStatement: this.$store.getters.isAdmin
        }
      ];
    }
  },
  middleware: ["initAuth"],
  methods: {
    async logoutUser() {
      await this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  }
};
</script>

<style lang='scss'>
.back {
  background: #c6ffdd; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f7797d,
    #fbd786,
    #c6ffdd
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f7797d,
    #fbd786,
    #c6ffdd
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.mobileTitle {
  font-size: 1.5rem !important;
}

v-btn {
  font-family: "Righteous", cursive !important;
}

v-app {
  font-family: "Righteous", cursive !important;
}

.cus-font {
  font-family: "Righteous", cursive !important;
  font-size: 1.3rem;
}

.house-title {
  text-decoration: none;
  color: black;
  font-size: 2rem;
  font-weight: 800;
  display: flex;
}

.pawIcon {
  margin-left: 5px;
}

.drawer_list {
  background-color: #ec9194 !important;
}
</style>
