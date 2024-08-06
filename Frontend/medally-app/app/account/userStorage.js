import * as SecureStore from 'expo-secure-store'; // For SecureStore

export const storeUserId = async (userId) => {
    try {
      await SecureStore.setItemAsync('user_id', userId);
    } catch (e) {
      console.error('Failed to save user ID:', e);
    }
  };
  
  export const getUserId = async () => {
    try {
      const userId = await SecureStore.getItemAsync('user_id');
      return userId;
    } catch (e) {
      console.error('Failed to retrieve user ID:', e);
    }
  };
  
  export const removeUserId = async () => {
    try {
      await SecureStore.deleteItemAsync('user_id');
    } catch (e) {
      console.error('Failed to remove user ID:', e);
    }
  };