import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAau3YKLlmm7eS89YVlRpRPaWtKNPpo58U",
  authDomain: "messenger-bfaf1.firebaseapp.com",
  projectId: "messenger-bfaf1",
  storageBucket: "messenger-bfaf1.appspot.com",
  messagingSenderId: "258497643739",
  appId: "1:258497643739:web:1017b8397d5879b1d5b8fe"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = firebase.auth();

export { db, auth }