import { promises as fs } from 'fs';
import path from 'path';

const userFilePath = path.join(__dirname, 'user-id.txt');

class SaveUser {
    async saveUserId(userId) {
        try {
            await fs.writeFile(userFilePath, userId, 'utf8');
        } catch (error) {
            console.error('Error saving user ID:', error);
        }
    }
    
    async getUserId() {
        try {
            await fs.access(userFilePath);
            const data = await fs.readFile(userFilePath, 'utf8');
            return data;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return null; // File does not exist
            }
            console.error('Error reading user ID:', error);
        }
        return null;
    }
}

export default SaveUser;