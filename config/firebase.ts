
// Original imports for v9 modular style that were causing errors:
// import { initializeApp } from 'firebase/app';
// import type { FirebaseApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import type { Auth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import type { Firestore } from 'firebase/firestore';

// FIX: Switch to Firebase v9 compat mode due to errors with modular imports.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// --- Firebase Configuration ---
// IMPORTANTE: Reemplaza esto con la configuración de tu proyecto Firebase si no usas variables globales
const firebaseConfigPlaceholder = {
  apiKey: "aquí api key",
  authDomain: "aquí otra cosa",
  projectId: "rumtaller-23036",
  storageBucket: "umtaller-23036.firebasestorage.app",
  messagingSenderId: "384746826242",
  appId: "0d9a951b",
  measurementId: "G-Z4WWJHF29R"
};

// FIX: Define types using firebase.app.App, firebase.auth.Auth, firebase.firestore.Firestore for compat mode.
let app: firebase.app.App | null = null;
let authInstance: firebase.auth.Auth | null = null; 
let firestoreInstance: firebase.firestore.Firestore | null = null; 
let effectiveAppId: string = 'default-rumtaller-app';
let firebaseInitializationError: string | null = null;

try {
  const configFromGlobal = window.__firebase_config ? JSON.parse(window.__firebase_config) : null;
  const effectiveFirebaseConfig = configFromGlobal || firebaseConfigPlaceholder;

  if (!effectiveFirebaseConfig.apiKey || effectiveFirebaseConfig.apiKey === "YOUR_API_KEY") {
    firebaseInitializationError = "API Key es inválida o es el marcador de posición 'YOUR_API_KEY'. Por favor, actualiza src/config/firebase.ts o proporciona la variable global __firebase_config con tu configuración real de Firebase.";
    console.error(`Firebase Configuration Error: ${firebaseInitializationError}`);
    // Do not proceed to initialize app, auth, db if API key is clearly invalid
  } else {
    // FIX: Use firebase.initializeApp for compat mode.
    app = firebase.initializeApp(effectiveFirebaseConfig);
    // FIX: Use firebase.auth(app) and firebase.firestore(app) for compat mode, passing the initialized app.
    authInstance = firebase.auth(app); 
    firestoreInstance = firebase.firestore(app);
    
    if (window.__app_id) {
      effectiveAppId = window.__app_id;
    }
    console.log("Firebase initialized successfully. App ID:", effectiveAppId);
  }
} catch (error: any) {
  firebaseInitializationError = error.message || "Un error desconocido ocurrió durante la inicialización de Firebase.";
  console.error("Error initializing Firebase:", error);
  app = null; 
  authInstance = null;
  firestoreInstance = null;
}

export { 
  app, 
  authInstance as auth, 
  firestoreInstance as db, 
  effectiveAppId, 
  firebaseInitializationError 
};
