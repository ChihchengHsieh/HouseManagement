<template>
  <v-layout row justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card class="elevation-24 signup-form">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sign Up</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              prepend-icon="person"
              name="login"
              label="Email"
              type="text"
              :rules="emailRules"
              v-on:keyup.enter="signupUser"
            ></v-text-field>
            <v-text-field
              v-model="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              :rules="passwordRules"
              v-on:keyup.enter="signupUser"
            ></v-text-field>
            <v-text-field
              v-model="passwordAgain"
              prepend-icon="lock"
              name="password"
              label="Password Again"
              id="passwordAgain"
              type="password"
              :rules="passwordAgainRules"
              v-on:keyup.enter="signupUser"
            ></v-text-field>
            <v-text-field
              v-model="signupCode"
              prepend-icon="lock"
              name="Signup Code"
              label="Signup Code"
              id="signupCode"
              type="password"
              :rules="signupCodeRules"
              v-on:keyup.enter="signupUser"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.stop="signupUser">SIGN UP</v-btn>
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
      passwordAgain: "",
      feedback: "",
      signupCode: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Pssword must be more than 6 characters"
      ],
      passwordAgainRules: [
        v => !!v || "Password check is required",
        v => v === this.password || "Password does not match"
      ],
      signupCodeRules: [v => !!v || "Signup Code is required"]
    };
  },
  middleware: ["loginGuard"],
  methods: {
    async signupUser() {
      if (this.password !== this.passwordAgain) {
        throw new Error("Password doesn't match");
      }

      if (
        !(this.password && this.passwordAgain && this.email && this.signupCode)
      ) {
        throw new Error("Input is required");
      }

      if (this.signupCode !== process.env.SIGNUP_CODE) {
        throw new Error("Invalid Operation");
      }

      await this.$store.dispatch("signupUser", {
        rule: "noraml",
        email: this.email,
        password: this.password,
        passwordAgain: this.passwordAgain
      });
      this.$router.push("/");
    }
  }
};
</script>

<style>
.signup-form {
  margin: 10vh auto;
}
</style>
