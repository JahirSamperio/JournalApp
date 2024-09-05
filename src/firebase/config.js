// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNTWe37GN30k-WdJ-wchPY9GjJhLrSsGE",
  authDomain: "react-cursos-ce51e.firebaseapp.com",
  projectId: "react-cursos-ce51e",
  storageBucket: "react-cursos-ce51e.appspot.com",
  messagingSenderId: "931018632954",
  appId: "1:931018632954:web:aa6c354db1e149af51a343"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore(FirebaseApp);
