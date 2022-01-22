import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMD9chJ35MC1mawTJg_m-x8xurpCwTjKQ",
  authDomain: "devrep-52228.firebaseapp.com",
  projectId: "devrep-52228",
  storageBucket: "devrep-52228.appspot.com",
  messagingSenderId: "1068859655602",
  appId: "1:1068859655602:web:ad1a1a6c829a46115310ab"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export default firebase