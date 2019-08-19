import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
import pkg from "./package";
// import DEV_APIKEY from "./secret";

const DEV_APIKEY = "DEVDEV";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */

  env: {
    SIGNUP_CODE: process.env.SIGNUP_CODE,
    FB_APIKEY: process.env.FB_APIKEY
  },

  head: {
    title: "CATS HOUSE",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.8.2/css/all.css",
        integrity:
          "sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Righteous"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#616161", height:'0.5rem'},

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vuetify", "@/plugins/db", "@/plugins/persistToken"], //

  /*
   ** Nuxt.js
   */
  modules: ["cookie-universal-nuxt", "@nuxtjs/axios"],
  build: {
    publicPath: "/public/",
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    extend(config, ctx) {}
  },

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  }
};
