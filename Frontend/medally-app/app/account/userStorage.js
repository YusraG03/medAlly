import AsyncStorage from '@react-native-async-storage/async-storage';

const userFilePath = 'user_id';

class UserStorage {
    async saveUserId(userId) {
        try {
            await AsyncStorage.setItem(userFilePath, userId);
            console.log(`User ID ${userId} saved successfully.`);
        } catch (error) {
            console.error('Error saving user ID:', error);
        }
    }   
    
    async getUserId() {
        try {
            const userId = await AsyncStorage.getItem(userFilePath);
            return userId !== null ? userId : null;
        } catch (error) {
            console.error('Error retrieving user ID:', error);
            return null;
        }
    }
}

export default UserStorage;