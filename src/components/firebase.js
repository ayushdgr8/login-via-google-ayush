// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjqbIO7-pm3MV9ii2hfFHdmyW2ZG-M64U",
  authDomain: "login-via-e46b6.firebaseapp.com",
  projectId: "login-via-e46b6",
  storageBucket: "login-via-e46b6.firebasestorage.app",
  messagingSenderId: "228375610000",
  appId: "1:228375610000:web:1c07f29eb609b0747b4e15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;