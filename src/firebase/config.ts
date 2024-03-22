// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_6TnuAZjm0PC3Y1UEqTJ-E-5mQz5EzFM",
  authDomain: "react-curso-19429.firebaseapp.com",
  projectId: "react-curso-19429",
  storageBucket: "react-curso-19429.appspot.com",
  messagingSenderId: "1095791258872",
  appId: "1:1095791258872:web:15d6efa4734d8e73505f0d",
  measurementId: "G-MJ546XTPCL",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const analytics = getAnalytics(FirebaseApp);
