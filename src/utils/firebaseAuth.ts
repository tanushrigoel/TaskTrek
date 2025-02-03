// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDdHbwdvO4-Qkdsvmpl6rWPhNW3NpPO7I",
  authDomain: "task-scheduler-a6127.firebaseapp.com",
  projectId: "task-scheduler-a6127",
  storageBucket: "task-scheduler-a6127.firebasestorage.app",
  messagingSenderId: "857803572585",
  appId: "1:857803572585:web:cfad4c5db276f6f13ca9f8",
  measurementId: "G-9TFBL8JXTV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
