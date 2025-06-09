// scripts/registerAdmin.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig.js';

const email = 'ADMIN_CREO@creo.com';
const password = 'CREO_2025';

async function registrarAdmin() {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(db, 'usuarios', uid), {
      usuario: 'ADMIN_CREO',
      correo: email,
      cargo: 'Jefe',
      nombreApellido: 'Administrador Principal',
      telefono: '',
    });

    console.log('✅ Usuario administrador creado con éxito');
  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error);
  }
}

registrarAdmin();
