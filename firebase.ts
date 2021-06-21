import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "messenger-2-fd1c5.firebaseapp.com",
    projectId: process.env.PROJECT_ID,
    storageBucket: "messenger-2-fd1c5.appspot.com",
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = firebase.auth();

export { db, auth }