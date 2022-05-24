import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8eIfW8fIlVdb3dz5MsJIq7LBp-QozeMw",
  authDomain: "liberary-management-app.firebaseapp.com",
  projectId: "liberary-management-app",
  storageBucket: "liberary-management-app.appspot.com",
  messagingSenderId: "645815718722",
  appId: "1:645815718722:web:c20365efacb57d8a50aedb"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
