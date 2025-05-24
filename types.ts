
// Original line: import type { User as FirebaseUser } from 'firebase/auth';
// FIX: Switched to Firebase v9 compat mode for User type due to "no exported member" error.
// This requires importing the main firebase object from compat/app and then the auth module.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React from 'react';

export interface Technique {
  name: string;
  icon: string;
  color: string;
}

export type TechniqueExamples = Record<string, Technique>;

export interface StepData {
  title: string;
  description: string;
  detail: string;
  icon: React.ReactElement;
  color: string;
  examples: string[];
}

// FIX: Define FirebaseUser using the compat mode firebase.auth.User type.
export type FirebaseUser = firebase.auth.User;

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadingAuth: boolean;
}

// Make __firebase_config, __initial_auth_token, __app_id optionally available on window
declare global {
  interface Window {
    __firebase_config?: string;
    __initial_auth_token?: string;
    __app_id?: string;
  }
}
