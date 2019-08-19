<template>
  <div>
    <v-layout wrap align-center justify-center>
      <v-btn round color="primary mb-3" to="/house-gallery/edit" v-if="$store.getters.isAdmin">Edit</v-btn>
      <v-flex xs12 class="hidden-sm-and-down elevation-10">
        <v-carousel hide-delimiters>
          <v-carousel-item v-for="(item,i) in slidingImages" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-flex
        xs12
        md6
        lg4
        v-for="(url,index) in staticImages"
        :key="index"
        class="gallery__img elevation-10"
      >
        <!-- <div class="fake-img" :style="`backgroundImage:url(${url.src})`"></div> -->
        <div :style="`backgroundImage:url(${url.src}); height:${imageHeight}`" class="fake-img">
          <house-image-vue :imageURL="url.src"  :imageHeight="imageHeight" ></house-image-vue>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import HouseImageVue from "../../components/HouseImage.vue";
import ImageWindowVue from "../../components/ImageWindow.vue";
import db from "../../plugins/db";

export default {
  async asyncData() {
    let staticImages = [];
    let slidingImages = [];

    const staticImagesDoc = await db.collection("static_img").get();
    const slidingImagesDoc = await db.collection("sliding_img").get();

    if (staticImagesDoc.size > 0) {
      staticImages = staticImagesDoc.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    }

    if (slidingImagesDoc.size > 0) {
      slidingImages = slidingImagesDoc.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    }

    return {
      staticImages,
      slidingImages
    };

    
  },
  data() {
    return {
      dialog: false
    };
  },
  components: {
    HouseImageVue,
    ImageWindowVue
  },
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "90vw";
        case "sm":
          return "80vw";
        case "md":
          return "35vw";
        case "lg":
          return "20vw";
        case "xl":
          return "30vw";
      }
    }
  },
};
</script>

<style lang='scss'>
.gallery__img {
  padding: 1rem;
}

.fake-img {
  height: 25vh;
  background-position: center;
  background-size: cover;
}
</style>
