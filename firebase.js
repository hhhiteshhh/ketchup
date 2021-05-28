import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDJrzXpFOsKXrHbbskJ9jTTE0ouMtTkRs",
  authDomain: "nativechatapp-e83f2.firebaseapp.com",
  projectId: "nativechatapp-e83f2",
  storageBucket: "nativechatapp-e83f2.appspot.com",
  messagingSenderId: "949229502908",
  appId: "1:949229502908:web:9e14bf1f915b4692bd6bb9",
  measurementId: "G-JHLCSQ9GQL",
};
let app;
if (firebase?.apps?.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
