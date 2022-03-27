// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG_-mqcmt4KL4cTRsepxaN33rmEdS6Pf4",
  authDomain: "chat25-4d7a1.firebaseapp.com",
  projectId: "chat25-4d7a1",
  storageBucket: "chat25-4d7a1.appspot.com",
  messagingSenderId: "903589745156",
  appId: "1:903589745156:web:8f794666483391e1839b51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}
