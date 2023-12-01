// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS-OmGfkbEWUqs91Z4szVaVCG2A2TDB_k",
  authDomain: "web-app-dev-assignment-1.firebaseapp.com",
  projectId: "web-app-dev-assignment-1",
  storageBucket: "web-app-dev-assignment-1.appspot.com",
  messagingSenderId: "781797487533",
  appId: "1:781797487533:web:55f58d005798b9eed4e724",
  measurementId: "G-4D4M1E6D56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;