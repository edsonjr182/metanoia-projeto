import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyByx5m9gaNXnSOFpQXxnkFuRM3QurSMGDE",
  authDomain: "metanoiaprojetov2.firebaseapp.com",
  projectId: "metanoiaprojetov2",
  storageBucket: "metanoiaprojetov2.firebasestorage.app",
  messagingSenderId: "852584896943",
  appId: "1:852584896943:web:cafb92c7f0567f90d2375a",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
