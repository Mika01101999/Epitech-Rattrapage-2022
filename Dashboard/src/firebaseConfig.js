import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAs_oFWcKKvsYosdwGiYWvy4WrH04NKey4",
  authDomain: "dashboad-d08ba.firebaseapp.com",
  projectId: "dashboad-d08ba",
  storageBucket: "dashboad-d08ba.appspot.com",
  messagingSenderId: "493368681392",
  appId: "1:493368681392:web:eb1f87fef19b99c86c6c75",
  measurementId: "G-VK8EY2N1GX"
};

export const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app)
