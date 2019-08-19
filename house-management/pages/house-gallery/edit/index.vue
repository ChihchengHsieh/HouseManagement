<template>
  <v-layout wrap justify-center align-start>
    <v-flex xs12 lg6 mb-5 pa-2>
      <v-card color="secondary elevation-5">
        <v-card-title class="justify-center">Sliding Images</v-card-title>
      </v-card>
      <v-card color="secondary elevation-5" d-flex>
        <v-layout wrap align-center justify-center pa-3>
          <v-flex xs10 d-flex align-center justify-center>
            <v-flex xs8>
              <v-text-field label="Image URL" v-model="sliding_link"></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="addSlidingImg">Add</v-btn>
            </v-flex>
          </v-flex>
          <v-flex xs12>
            <image-list-vue :imgs="slidingImgs" collection_name="sliding_img"></image-list-vue>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 lg6 pa-2>
      <v-card color="secondary elevation-5">
        <v-card-title class="justify-center">Static Images</v-card-title>
      </v-card>
      <v-card color="secondary elevation-5" d-flex>
        <v-layout wrap align-center justify-center pa-3>
          <v-flex xs10 d-flex align-center justify-center>
            <v-flex xs8>
              <v-text-field label="Image URL" v-model="static_link"></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="addStaticImg">Add</v-btn>
            </v-flex>
          </v-flex>
          <v-flex xs12>
            <image-list-vue :imgs="staticImgs" collection_name="static_img"></image-list-vue>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import db from "../../../plugins/db";
import ImageListVue from "../../../components/ImageList.vue";

export default {
  async asyncData() {
    let staticImgs = [];
    let slidingImgs = [];

    const staticDoc = await db.collection("static_img").get();
    const slidingDoc = await db.collection("sliding_img").get();

    if (staticDoc.size > 0) {
      staticImgs = staticDoc.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    if (slidingDoc.size > 0) {
      slidingImgs = slidingDoc.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    return {
      staticImgs,
      slidingImgs
    };
  },

  methods: {
    async addStaticImg() {
      const ref = db.collection("static_img").doc();
      await ref.set({
        src: this.static_link
      });
      window.location.reload(true);
    },
    async addSlidingImg() {
      const ref = db.collection("sliding_img").doc();
      await ref.set({
        src: this.sliding_link
      });
      window.location.reload(true);
    }
  },

  data() {
    return {
      static_link: "",
      sliding_link: ""
    };
  },

  components: {
    ImageListVue
  },

  middleware: ["adminAuth"]
};
</script>

<style>
</style>
