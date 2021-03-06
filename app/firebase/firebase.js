// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW3nTL5j8fdmBKbMI8LN6qgA6ei8mt0pw",
  authDomain: "simart-5a0ac.firebaseapp.com",
  projectId: "simart-5a0ac",
  storageBucket: "simart-5a0ac.appspot.com",
  messagingSenderId: "123722745038",
  appId: "1:123722745038:web:61d80783ee2ce8a0b5fc9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
export { storage, auth as default };
