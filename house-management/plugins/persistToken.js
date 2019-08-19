import firebase from "firebase";

export default async ({ store }) => {
  await firebase.auth().onAuthStateChanged(async user => {
    if (user && user.email) {
      await store.commit("updateUserInfo", {
        email: user.email
      });
      // await store.commit('setUserInfo',{

      // })

      // const ref = firebase
      //   .app()
      //   .firestore()iai
      //   .collection("users")
      //   .doc(user.email);
      // const userInfo = await ref.get();

      // await store.commit("setUserInfo", {
      //   ...userInfo.data()
      // });
    }
  });
};
