// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzPuunIosyXp4HaX0uKGaoG120I8FKEAE",
  authDomain: "rs-construccion-app.firebaseapp.com",
  projectId: "rs-construccion-app",
  storageBucket: "rs-construccion-app.firebasestorage.app",
  messagingSenderId: "637873989874",
  appId: "1:637873989874:web:0d909de0f97ae97fa3086b",
  measurementId: "G-V1S5RG2B7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);