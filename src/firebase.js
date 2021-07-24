import firebase from "firebase/app";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBlPBO3bKcNhFWL-RQ-fcLM90Srp3qWqUk",
  authDomain: "first-firebase-4793d.firebaseapp.com",
  databaseURL: "https://first-firebase-4793d-default-rtdb.firebaseio.com",
  projectId: "first-firebase-4793d",
  storageBucket: "first-firebase-4793d.appspot.com",
  messagingSenderId: "734633674256",
  appId: "1:734633674256:web:1310dc24e863b7203b2c95",
};

firebase.initializeApp(firebaseConfig);

export default firebase;