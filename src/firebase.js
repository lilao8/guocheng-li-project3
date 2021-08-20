import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDY1ZCbusssSru_hD6zCelzn6YiUCD3qhU",
  authDomain: "project-3-34df9.firebaseapp.com",
  databaseURL: "https://project-3-34df9-default-rtdb.firebaseio.com",
  projectId: "project-3-34df9",
  storageBucket: "project-3-34df9.appspot.com",
  messagingSenderId: "212367046815",
  appId: "1:212367046815:web:97c0b07ffa70e24ba64aaa",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
