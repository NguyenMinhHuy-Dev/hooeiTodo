
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyAkC8o1OR383I8_zu5zvV7qnEErfCUd0U8",
    authDomain: "todoapp-bdfd3.firebaseapp.com",
    projectId: "todoapp-bdfd3",
    storageBucket: "todoapp-bdfd3.appspot.com",
    messagingSenderId: "295703745547",
    appId: "1:295703745547:web:73701707a13043c937a30e",
    measurementId: "G-9G4TQKX71C"
  };


export const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const db = getFirestore(app);
