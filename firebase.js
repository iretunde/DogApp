import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth as initAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDDcoRh_FxIe3IpLmegApjS02XtnmwEauY",
  authDomain: "dogappauthentication.firebaseapp.com",
  projectId: "dogappauthentication",
  storageBucket: "dogappauthentication.firebasestorage.app",
  messagingSenderId: "862222697582",
  appId: "1:862222697582:web:f8cecdf9daded2d4b4527f",
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === "web") {
  // Web configuration
  auth = getAuth(app);
} else {
  // Mobile configuration
  auth = initAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}
export { auth };
