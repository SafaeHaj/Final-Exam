import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0DPZmA_nFHxmBygiWhK1hvp_fWXt2G6o",
  authDomain: "final-exam-20585.firebaseapp.com",
  projectId: "final-exam-20585",
  storageBucket: "final-exam-20585.appspot.com",
  messagingSenderId: "610890969885",
  appId: "1:610890969885:web:bce2f16560c6db630367f4"
};

firebase.initializeApp(firebaseConfig);
const projectAuthentication = firebase.auth();

const app = firebase.firestore();

export {app, projectAuthentication};