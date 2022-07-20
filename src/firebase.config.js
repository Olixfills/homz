// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB8Yv7YBlYtuSPv0wkfqIyIfPFHGwNMUw",
  authDomain: "homz-app.firebaseapp.com",
  projectId: "homz-app",
  storageBucket: "homz-app.appspot.com",
  messagingSenderId: "164792418817",
  appId: "1:164792418817:web:f9b62f2c0d511a3a2e7600"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
export const db = getFirestore()