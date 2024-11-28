// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDcoRh_FxIe3IpLmegApjS02XtnmwEauY",
  authDomain: "dogappauthentication.firebaseapp.com",
  projectId: "dogappauthentication",
  storageBucket: "dogappauthentication.firebasestorage.app",
  messagingSenderId: "862222697582",
  appId: "1:862222697582:web:f8cecdf9daded2d4b4527f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app); // Use getAuth to initialize the authentication instance

export { auth };
