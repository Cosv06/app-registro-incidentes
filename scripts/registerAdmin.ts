// scripts/registerAdmin.ts
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig.js';

const email = 'admin_creo_2@creo.com';
const password = 'CREO_2025';

async function registrarAdmin() {
  try {
    // Verifica si el correo ya está en uso
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      console.log(`⚠️ El correo ${email} ya está registrado. No se creará un nuevo usuario.`);
      return;
    }

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
