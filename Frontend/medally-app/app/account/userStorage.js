import * as FileSystem from 'expo-file-system';

const userFilePath = FileSystem.documentDirectory + 'user_id.txt';

class UserStorage {
    async saveUserId(userId) {
        try {
            await FileSystem.writeAsStringAsync(userFilePath, userId, { encoding: FileSystem.EncodingType.UTF8 });
        } catch (error) {
            console.error('Error saving user ID:', error);
        }
    }
    
    async getUserId() {
        try {
            const fileInfo = await FileSystem.getInfoAsync(userFilePath);
            if (!fileInfo.exists) {
                return null;
            }
            return await FileSystem.readAsStringAsync(userFilePath, { encoding: FileSystem.EncodingType.UTF8 });
        } catch (error) {
            console.error('Error reading user ID:', error);
            return null;
        }
    }
}

export default UserStorage;