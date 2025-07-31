import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdeD-sfKSnJ-hHhBM85E3X6pxjbgug7PU",
  authDomain: "techengine-81643.firebaseapp.com",
  projectId: "techengine-81643",
  storageBucket: "techengine-81643.appspot.com",
  messagingSenderId: "581998283793",
  appId: "1:581998283793:web:5fdc353faa0a6d9cbeb5b0",
  measurementId: "G-W23H2R7QDB"
};

// Initialize Firebase with error handling
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  // Provide fallback values
  app = null;
  auth = null;
  db = null;
  storage = null;
}

export { auth, db, storage };
export default app; 