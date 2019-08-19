<template>
  <div class="elevation-10">
    <v-carousel hide-delimiters class="elevation-10">
      <v-carousel-item v-for="(item,i) in slidingImageURLs" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },

  props: ["slidingImageURLs", "index"],

  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    }
  }
};
</script>


<style lang="scss">
</style>