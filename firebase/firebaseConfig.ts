// firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqx0s9Fvq-vtJeH8oI4dYyflCVeexZi3k",
  authDomain: "clinica-creo-193ae.firebaseapp.com",
  projectId: "clinica-creo-193ae",
  storageBucket: "clinica-creo-193ae.firebasestorage.app",
  messagingSenderId: "653911894682",
  appId: "1:653911894682:web:00f8e2da191534494ccd23",
  measurementId: "G-TDDLQZMYW6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

