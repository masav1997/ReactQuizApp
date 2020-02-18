import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACicTLlrukH2V9zPiYJifkwQ0awKX5NJ4",
  authDomain: "quiz-798ab.firebaseapp.com",
  databaseURL: "https://quiz-798ab.firebaseio.com",
  projectId: "quiz-798ab",
  storageBucket: "quiz-798ab.appspot.com",
  messagingSenderId: "495077460222",
  appId: "1:495077460222:web:8488b69a5e02ee78857daf"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
