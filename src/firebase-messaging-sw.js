import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy4t9A7OB86v8WyB8Yj7B4xfo_Ph2dKao",
  authDomain: "aathrayam.firebaseapp.com",
  projectId: "aathrayam",
  storageBucket: "aathrayam.firebasestorage.app",
  messagingSenderId: "950622213694",
  appId: "1:950622213694:web:b567e26afbefd3b729636f",
  measurementId: "G-GXEKML7QQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
export  const messaging = getMessaging(app);