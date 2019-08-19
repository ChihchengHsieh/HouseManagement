<template >
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <div class="contain_image" :style="`height:${imageHeight}`" contain v-on="on"></div>
    </template>
    <v-card>
      <v-img :src="imageURL" aspect-ratio="1.7" class="largeImg elevation-15">
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
    </v-card>
  </v-dialog>
</template>



<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: ["imageURL", "imageHeight"]
};
</script>



<style>
.largeImg {
  height: 90vh;
  border: 8px solid #ec9194;
}

.showImg {
  display: block;
  height: 100%;
  width: 100%;
}

.contain_image {
  height: 25vh;
  z-index: 1;
}
</style>
