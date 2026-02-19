import app from './firebase';

export const testFirebaseConnection = () => {
  try {
    if (app.name) {
      console.log('Firebase initialized:', app.name);
      return true;
    }
  } catch (e) {
    console.log('Firebase not initialized:', e);
    return false;
  }
};
