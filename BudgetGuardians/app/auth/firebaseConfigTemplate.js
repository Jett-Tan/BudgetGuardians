// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, collection, addDoc, setDoc,updateDoc } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { get } from "firebase/database";
import { useRouter } from "expo-router";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)

});

// To Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore();
const db = getFirestore(app);
export {app, db, getFirestore, collection, addDoc,setDoc,updateDoc };