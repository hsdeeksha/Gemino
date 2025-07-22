// Import core Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// ✅ Import Firebase Auth
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCBYwWXORbwwTBOzrlQuUR0TWWDlaLLVYc",
  authDomain: "gemino-chat.firebaseapp.com",
  projectId: "gemino-chat",
  storageBucket: "gemino-chat.appspot.com",
  messagingSenderId: "298909427115",
  appId: "1:298909427115:web:36f42f6106006607731eee",
  measurementId: "G-2KP6Q401VQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Set up Auth & Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Export them
export { auth, googleProvider };
