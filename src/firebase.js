import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzXA_ZA52-tPlNSVDCyNjau_-x7VUGU0Y",
  authDomain: "project-3-bd1e5.firebaseapp.com",
  databaseURL: "https://project-3-bd1e5-default-rtdb.firebaseio.com",
  projectId: "project-3-bd1e5",
  storageBucket: "project-3-bd1e5.appspot.com",
  messagingSenderId: "846440590750",
  appId: "1:846440590750:web:6a10be799f8065bfc6fa8f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
