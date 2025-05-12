// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBk07gXmynMoGNkU3aa_fdOuMmDfp0snF8',
  authDomain: 'auth-integration-demo.firebaseapp.com',
  projectId: 'auth-integration-demo',
  storageBucket: 'auth-integration-demo.appspot.com',
  messagingSenderId: '745812985732',
  appId: '1:745812985732:web:abcdefgh12345678' // ← den her!
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
