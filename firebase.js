// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIw5ha3tb7cNvVwiJO-7xxfCL65gR_IGs",
  authDomain: "healthbridge-66f20.firebaseapp.com",
  projectId: "healthbridge-66f20",
  storageBucket: "healthbridge-66f20.appspot.com",
  messagingSenderId: "1007948593629",
  appId: "1:1007948593629:web:51627c3b11b00c2f56de34",
  measurementId: "G-BD9TV39J6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);