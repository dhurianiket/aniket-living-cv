import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Define the baseline configuration reading from Vite environment variables
let firebaseConfig: any = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Use Vite's glob import to optionally load the gitignored config file if it exists.
// Crucially, if the file is missing during production builds or CI/CD pipelines,
// import.meta.glob will gracefully evaluate to an empty object rather than casting a build error.
try {
  const configs = import.meta.glob('../../firebase-applet-config.json', { eager: true }) as Record<string, any>;
  const paths = Object.keys(configs);
  if (paths.length > 0) {
    const localConfig = configs[paths[0]];
    const resolvedConfig = localConfig?.default || localConfig;
    if (resolvedConfig && resolvedConfig.projectId) {
      firebaseConfig = {
        ...firebaseConfig,
        ...resolvedConfig,
      };
    }
  }
} catch (error) {
  console.warn('Could not load local firebase-applet-config.json, relying on environment variables.', error);
}

// Only initialize if config is present to prevent crashing when keys are missing
export const app = firebaseConfig && firebaseConfig.projectId ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : null;
export const auth = app ? getAuth(app) : null;

export const isFirebaseConfigured = !!(firebaseConfig && firebaseConfig.projectId && firebaseConfig.apiKey);
export const getFirebaseConfigStatus = () => {
  const missing = [];
  if (!firebaseConfig?.projectId) missing.push("VITE_FIREBASE_PROJECT_ID");
  if (!firebaseConfig?.apiKey) missing.push("VITE_FIREBASE_API_KEY");
  if (!firebaseConfig?.authDomain) missing.push("VITE_FIREBASE_AUTH_DOMAIN");
  if (!firebaseConfig?.appId) missing.push("VITE_FIREBASE_APP_ID");
  return {
    isConfigured: isFirebaseConfigured,
    missingKeys: missing,
    configSource: firebaseConfig && firebaseConfig.projectId ? "firebase-applet-config.json" : "Environment variables"
  };
};
