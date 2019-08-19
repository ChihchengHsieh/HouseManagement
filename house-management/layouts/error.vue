<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title class='errorMessage'>{{ error.message ? error.message : error}}</v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["error"],
  layout: "default"
};
</script>

<style>

.errorMessage{
    text-align: center;
}
</style>
