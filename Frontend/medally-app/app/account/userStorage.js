import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // For SecureStore (mobile)

// Web-specific imports
const isWeb = Platform.OS === 'web';

const webStorage = {
  storeUserId: async (userId) => {
    try {
      localStorage.setItem('user_id', userId);
    } catch (e) {
      console.error('Failed to save user ID:', e);
    }
  },
  getUserId: async () => {
    try {
      const userId = localStorage.getItem('user_id');
      return userId;
    } catch (e) {
      console.error('Failed to retrieve user ID:', e);
    }
  },
  removeUserId: async () => {
    try {
      localStorage.removeItem('user_id');
    } catch (e) {
      console.error('Failed to remove user ID:', e);
    }
  },
};

const mobileStorage = {
  storeUserId: async (userId) => {
    try {
      await SecureStore.setItemAsync('user_id', userId);
    } catch (e) {
      console.error('Failed to save user ID:', e);
    }
  },
  getUserId: async () => {
    try {
      const userId = await SecureStore.getItemAsync('user_id');
      return userId;
    } catch (e) {
      console.error('Failed to retrieve user ID:', e);
    }
  },
  removeUserId: async () => {
    try {
      await SecureStore.deleteItemAsync('user_id');
    } catch (e) {
      console.error('Failed to remove user ID:', e);
    }
  },
};

export const storeUserId = async (userId) => {
  if (isWeb) {
    await webStorage.storeUserId(userId);
  } else {
    await mobileStorage.storeUserId(userId);
  }
};

export const getUserId = async () => {
  if (isWeb) {
    return await webStorage.getUserId();
  } else {
    return await mobileStorage.getUserId();
  }
};

export const removeUserId = async () => {
  if (isWeb) {
    await webStorage.removeUserId();
  } else {
    await mobileStorage.removeUserId();
  }
};
