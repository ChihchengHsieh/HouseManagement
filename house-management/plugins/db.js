import firebase from "firebase";
import firestore from "firebase/firestore";
// import secret from "../secret";

var firebaseConfig = {
  apiKey: process.env.FB_APIKEY || secret,  // 
  authDomain: "house-management-8e285.firebaseapp.com",
  databaseURL: "https://house-management-8e285.firebaseio.com",
  projectId: "house-management-8e285",
  storageBucket: "house-management-8e285.appspot.com",
  messagingSenderId: "1091967697393",
  appId: "1:1091967697393:web:daeece9698721c5a"
};
// Initialize Firebase
export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore());
