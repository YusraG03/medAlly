import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAEwhX6fj388bexptdODAhCOPRcP_MReNc',
  authDomain: 'medally-b3cd0.firebaseapp.com',
  projectId: 'medally-b3cd0',
  storageBucket: 'medally-b3cd0.appspot.com', // FIXED typo
  messagingSenderId: '1050551053204',
  appId: '1:1050551053204:web:f42edd3cbf5dc37a81bd81',
  measurementId: 'G-6ZWYBED3FZ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
