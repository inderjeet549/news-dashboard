import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJmzhBWkqIRhCye7AI6KU2KYpuaZZo-9E",
    authDomain: "newsapp-841bd.firebaseapp.com",
    projectId: "newsapp-841bd",
    storageBucket: "newsapp-841bd.firebasestorage.app",
    messagingSenderId: "865781291642",
    appId: "1:865781291642:web:d0c943f9556bc92d15b9c3",
    measurementId: "G-WZ2DRBHKTL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Login Error:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth };
