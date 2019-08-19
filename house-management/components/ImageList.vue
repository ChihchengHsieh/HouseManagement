<template>
  <v-layout wrap>
    <v-menu absolute offset-y class="text-xs-center" v-for="(img,index) in imgs" :key="index">
      <template v-slot:activator="{ on }">
        <v-flex xs12 sm6 md4 lg3 xl2>
          <v-card class="imgList__card elevation-15" color="secondary">
            <div
              class="imgList__img"
              :style="`background-image: url(${img.src});height:${imageHeight}`"
              v-on="on"
            ></div>
          </v-card>
        </v-flex>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in menuItems"
          :key="index"
          @click="()=>{item.func(img.id)}"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
import db from "../plugins/db";

export default {
  data() {
    return {
      menuItems: [
        {
          title: "Delete",
          func: this.deleteImage
        }
      ]
    };
  },

  methods: {
    async deleteImage(id) {
      await db
        .collection(this.collection_name)
        .doc(id)
        .delete();
      window.location.reload(true);
    }
  },

  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "80vw";
        case "sm":
          return "40vw";
        case "md":
          return "22vw";
        case "lg":
          return "10vw";
        case "xl":
          return "5vw";
      }
    }
  },

  props: ["imgs", "collection_name"]
};
</script>

<style>
.imgList__img {
  background-position: center;
  background-size: cover;
}

.imgList__card {
  padding: 0.3rem;
}
</style>
