import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB2k0U-Lx2fJO0uW4F9zpFmZvPWr_Kytyw",
  authDomain: "v-chat-f3146.firebaseapp.com",
  databaseURL: "https://v-chat-f3146.firebaseio.com",
  projectId: "v-chat-f3146",
  storageBucket: "v-chat-f3146.appspot.com",
  messagingSenderId: "65028655714",
  appId: "1:65028655714:web:4ac2cabc227c91ac65df3b",
  measurementId: "G-0607N5DCVJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
