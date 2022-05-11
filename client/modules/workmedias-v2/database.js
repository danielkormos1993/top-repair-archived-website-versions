import { initializeApp } from './firebase/firebase-app.js';
import { getFirestore } from './firebase/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyC6_isdqWdDMxN3zw6BNEX9BYNPM6I1UpA",
  authDomain: "toprepair-202905.firebaseapp.com",
  databaseURL: "https://toprepair-202905-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "toprepair-202905",
  storageBucket: "toprepair-202905.appspot.com",
  messagingSenderId: "1094324677500",
  appId: "1:1094324677500:web:df534a459cd9657a5392f9"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database }