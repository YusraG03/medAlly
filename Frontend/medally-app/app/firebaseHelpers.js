import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import app from './firebase';

// Auth
export const auth = getAuth(app);

export async function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

// Firestore
export const db = getFirestore(app);

export async function saveUserData(uid, data) {
  return setDoc(doc(db, 'users', uid), data, { merge: true });
}

export async function getUserData(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function updateUserData(uid, data) {
  return updateDoc(doc(db, 'users', uid), data);
}
