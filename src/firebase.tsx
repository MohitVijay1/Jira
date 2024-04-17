// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKDVsa0EdC_4l7YgMrDfUp8hOtFgUsxHE",
  authDomain: "jira-260eb.firebaseapp.com",
  projectId: "jira-260eb",
  storageBucket: "jira-260eb.appspot.com",
  messagingSenderId: "962610444338",
  appId: "1:962610444338:web:59e88645db1b875f36642b",
  measurementId: "G-KJX28CTTMY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);
