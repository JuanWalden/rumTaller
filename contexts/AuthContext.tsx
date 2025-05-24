
import React, { createContext, useState, useEffect, ReactNode } from 'react';
// FirebaseUser type is now correctly sourced from ../types which uses compat mode
import { AuthContextType, FirebaseUser } from '../types';
import { auth, db, effectiveAppId } from '../config/firebase'; // auth is now a compat instance
// FIX: Remove direct imports of auth functions from 'firebase/auth' as they will be methods on the 'auth' instance.
// Original failing imports:
// import type { User as FirebaseUser } from 'firebase/auth'; // Handled in types.ts
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut as firebaseSignOut, 
//   signInAnonymously,
//   signInWithCustomToken
// } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore'; // Uncomment if saving user profiles

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth is not initialized. Auth features will be unavailable.");
      setLoadingAuth(false);
      setUserId(crypto.randomUUID()); 
      return;
    }

    // FIX: Use auth.onAuthStateChanged (method on the auth compat instance)
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserId(user.uid);
        // Example: Save/update user profile in Firestore
        // if (db && user.uid && !user.isAnonymous) {
        //   try {
        //     await setDoc(doc(db, `apps/${effectiveAppId}/users/${user.uid}/profile`), { 
        //       email: user.email, 
        //       lastLogin: new Date(),
        //       uid: user.uid
        //     }, { merge: true });
        //   } catch (error) {
        //     console.error("Error saving user profile:", error);
        //   }
        // }
      } else {
        // No user signed in
        if (window.__initial_auth_token && auth) {
          try {
            console.log("Attempting sign in with custom token...");
            // FIX: Use auth.signInWithCustomToken (method on the auth compat instance)
            await auth.signInWithCustomToken(window.__initial_auth_token);
            console.log("Custom token sign-in successful (pending auth state change).");
          } catch (error) {
            console.error("Error signing in with custom token:", error);
            tryAndSignInAnonymously();
          }
        } else {
          tryAndSignInAnonymously();
        }
      }
      setLoadingAuth(false);
    });

    const tryAndSignInAnonymously = async () => {
      if (auth) {
        try {
          console.log("Attempting anonymous sign-in...");
          // FIX: Use auth.signInAnonymously (method on the auth compat instance)
          await auth.signInAnonymously();
          console.log("Anonymous sign-in successful (pending auth state change).");
        } catch (error) {
          console.error("Error signing in anonymously:", error);
          setCurrentUser(null);
          setUserId(crypto.randomUUID()); 
        }
      } else {
        setCurrentUser(null);
        setUserId(crypto.randomUUID()); 
      }
    };
    
    return () => unsubscribe();
  }, []); // auth instance from config/firebase is stable

  const login = async (email: string, password: string): Promise<void> => {
    if (!auth) throw new Error("Firebase Auth not initialized.");
    // FIX: Use auth.signInWithEmailAndPassword (method on the auth compat instance)
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    if (!auth) throw new Error("Firebase Auth not initialized.");
    // FIX: Use auth.createUserWithEmailAndPassword (method on the auth compat instance)
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    // User profile creation can be handled by onAuthStateChanged or here
    // Example: if (db && userCredential.user.uid) {
    //   await setDoc(doc(db, `apps/${effectiveAppId}/users/${userCredential.user.uid}/profile`), { 
    //     email: userCredential.user.email, 
    //     createdAt: new Date(),
    //     uid: userCredential.user.uid 
    //   });
    // }
  };

  const logout = async (): Promise<void> => {
    if (!auth) throw new Error("Firebase Auth not initialized.");
    // FIX: Use auth.signOut (method on the auth compat instance)
    await auth.signOut();
    // After signing out, onAuthStateChanged will trigger.
    // ... (rest of logout logic)
  };

  const value: AuthContextType = {
    currentUser,
    userId,
    login,
    signup,
    logout,
    loadingAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
