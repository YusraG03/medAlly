import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userFilePath = 'user_id';

class UserStorage {
    async saveUserId(userId) {
        try {
            if (Platform.OS === 'web') {
                localStorage.setItem(userFilePath, userId);
                console.log(`User ID ${userId} saved successfully in localStorage.`);
            } else {
                await AsyncStorage.setItem(userFilePath, userId);
                console.log(`User ID ${userId} saved successfully in AsyncStorage.`);
            }
        } catch (error) {
            console.error('Error saving user ID:', error);
        }
    }

    async getUserId() {
        try {
            if (Platform.OS === 'web') {
                const userId = localStorage.getItem(userFilePath);
                return userId !== null ? userId : null;
            } else {
                const userId = await AsyncStorage.getItem(userFilePath);
                return userId !== null ? userId : null;
            }
        } catch (error) {
            console.error('Error retrieving user ID:', error);
            return null;
        }
    }
}

export default UserStorage;
