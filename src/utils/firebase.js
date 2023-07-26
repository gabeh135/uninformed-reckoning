// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKjgAz_ALXlRGoiB4wEPyZE8MkuETVrx0",
  authDomain: "uninformed-reckoning.firebaseapp.com",
  projectId: "uninformed-reckoning",
  databaseURL: "https://uninformed-reckoning-default-rtdb.firebaseio.com",
  storageBucket: "uninformed-reckoning.appspot.com",
  messagingSenderId: "60871414261",
  appId: "1:60871414261:web:6e494542360047625010bc",
  measurementId: "G-VFJ73FQ547"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getDatabase(app);
console.log(db);
export {db};