import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBNCRRgoWyP5UD8njc0f-6GmpGSp0hvd9Y",
    authDomain: "chat-app-f3e3f.firebaseapp.com",
    databaseURL: "https://chat-app-f3e3f.firebaseio.com",
    projectId: "chat-app-f3e3f",
    storageBucket: "chat-app-f3e3f.appspot.com",
    messagingSenderId: "541981103731",
    appId: "1:541981103731:web:83dad3274462c8b5d27c06",
    measurementId: "G-PZTWW3HSGE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;