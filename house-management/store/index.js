import Vuex from "vuex";
import firebase from "firebase";
import db from "../plugins/db";

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      currentUser: null
    }),

    mutations: {
      setUserInfo(state, userInfo) {
        state.currentUser = userInfo;
      },
      updateUserInfo(state, updateUserInfo) {
        state.currentUser = { ...state.currentUser, ...updateUserInfo };
      }
    },

    actions: {
      async loginUser(context, loginUserInfo) {
        const cred = await firebase
          .auth()
          .signInWithEmailAndPassword(
            loginUserInfo.email,
            loginUserInfo.password
          );

        if (cred.user.email) {
          const ref = db.collection("users").doc(cred.user.email);
          // .where("user_id", "==", cred.user.uid);
          const userInfo = await ref.get();

          context.commit("setUserInfo", {
            ...userInfo.data()
          });

          const savingInfo = {
            email: loginUserInfo.email,
            rule: this.getters.isAdmin ? "admin" : "noraml"
          };

          localStorage.setItem("user", JSON.stringify(savingInfo));
          this.$cookies.set("user", savingInfo);
        }
      },

      async logoutUser(context) {
        await firebase.auth().signOut();
        context.commit("setUserInfo", null);
        localStorage.removeItem("user");
        this.$cookies.remove("user");
      },

      formatDate(context, date) {
        if (!date) {
          return null;
        }

        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
      },

      async signupUser(context, signupUserInfo) {
        const ref = db.collection("users").doc(signupUserInfo.email);

        const doc = await ref.get();

        if (doc.exists) {
          throw new Error("This email already exists");
        }

        const cred = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            signupUserInfo.email,
            signupUserInfo.password
          );

        const userStoringData = {
          rule: signupUserInfo.rule,
          email: signupUserInfo.email,
          user_id: cred.user.uid,
          name: "",
          stayingRoom: "",
          startingDate: new Date().toISOString().substr(0, 10),
          endingDate: new Date().toISOString().substr(0, 10),
          phone: "",
          description: ""
        };
        await ref.set(userStoringData);
        context.commit("setUserInfo", {
          ...userStoringData
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userStoringData.email,
            rule: userStoringData.rule
          })
        );
        this.$cookies.set("user", {
          email: userStoringData.email,
          rule: userStoringData.rule
        });
      },

      async initAuth(context, req) {
        if (!context.getters.isLogin) {
          let user = null;
          if (!req) {
            user = JSON.parse(localStorage.getItem("user"));
          } else {
            user = this.$cookies.get("user");
          }

          if (user) {
            context.commit("setUserInfo", user);
          }
        }
        ////////////////////

        // let user = null;
        // if (!req) {
        //   user = JSON.parse(localStorage.getItem("user"));
        // } else {
        //   user = this.$cookies.get("user");
        // }

        // if (user) {
        //   const userInfo = await db
        //     .collection("users")
        //     .doc(user.email)
        //     .get();

        //   if (userInfo.exists) {
        //     context.commit("setUserInfo", userInfo.data());
        //   }
        // }
      },

      async updateUserInfo(context, updateInfo) {
        const ref = db.collection("users").doc(context.state.getters.userEmail);
        await ref.update(updateInfo);
      }
    },
    getters: {
      isLogin: state => {
        return !!state.currentUser;
      },
      isAdmin: state => {
        return state.currentUser && state.currentUser.rule === "admin";
      },
      userEmail: state => {
        if (state.currentUser) {
          return state.currentUser.email;
        }
        return null;
      },
      userRoom: state => {
        if (state.currentUser) {
          return state.currentUser.stayingRoom;
        }
      },

      profileInfo: state => {
        if (state.currentUser) {
          const {
            name,
            startingDate,
            endingDate,
            stayingRoom,
            phone,
            description
          } = state.currentUser;

          return {
            name,
            startingDate,
            endingDate,
            stayingRoom,
            phone,
            description
          };
        } else {
          return null;
        }
      }
    }
  });
};

export default createStore;
