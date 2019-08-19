<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10 md8 lg6>
    <v-card class="elevation-24 login-form">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-on:keyup.enter="loginUser">
          <v-text-field
            prepend-icon="person"
            name="login"
            label="Login"
            type="text"
            :rules="requireRules"
            v-model="email"
            v-on:keyup.enter="loginUser"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            name="password"
            label="Password"
            id="password"
            type="password"
            :rules="requireRules"
            v-model="password"
            v-on:keyup.enter="loginUser"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn round color="primary"  @click.stop="loginUser">Login</v-btn>
      </v-card-actions>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      requireRules: [v => !!v || "Input is required"]
    };
  },
  middleware: ["loginGuard"],
  updated() {
    if (this.$store.getters.isLogin) {
      this.$router.push("/");
    }
  },
  methods: {
    async loginUser() {
      if (this.email && this.password) {
        await this.$store.dispatch("loginUser", {
          email: this.email,
          password: this.password
        });
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.login-form{
  margin: 10vh auto;
}

</style>
