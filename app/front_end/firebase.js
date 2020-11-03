import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf98mQmW8TFBnpT1eH6znTQs1JLt798i4",
  authDomain: "testingbase-c7777.firebaseapp.com",
  databaseURL: "https://testingbase-c7777.firebaseio.com",
  projectId: "testingbase-c7777",
  storageBucket: "testingbase-c7777.appspot.com",
  messagingSenderId: "110217793680",
  appId: "1:110217793680:web:01aaf67b4bb4db677d0815",
  measurementId: "G-LFP53XFVG6"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = app.database();
export const firestore = firebase.firestore();