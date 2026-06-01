import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Define the baseline configuration reading from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Only initialize if config is present to prevent crashing when keys are missing
export const app = firebaseConfig.projectId ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

export const isFirebaseConfigured = !!(firebaseConfig.projectId && firebaseConfig.apiKey);
export const getFirebaseConfigStatus = () => {
  const missing = [];
  if (!firebaseConfig.projectId) missing.push("VITE_FIREBASE_PROJECT_ID");
  if (!firebaseConfig.apiKey) missing.push("VITE_FIREBASE_API_KEY");
  if (!firebaseConfig.authDomain) missing.push("VITE_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig.appId) missing.push("VITE_FIREBASE_APP_ID");
  return {
    isConfigured: isFirebaseConfigured,
    missingKeys: missing,
    configSource: "Environment variables"
  };
};
