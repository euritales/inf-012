import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJDnMcf542ubKczt7AZy0ZbHhihxF8HNw",
  authDomain: "inf012-prod.firebaseapp.com",
  projectId: "inf012-prod",
  storageBucket: "inf012-prod.appspot.com",
  messagingSenderId: "1058845973093",
  appId: "1:1058845973093:web:08a3876656c24f8ba1c48c",
};

const app = initializeApp(firebaseConfig);
var auth = null;
if (app) {
  auth = getAuth();
}

export default auth;
