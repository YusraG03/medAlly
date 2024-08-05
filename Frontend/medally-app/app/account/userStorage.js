import fs from 'fs/promises';
import { existsSync } from 'fs';

const userFilePath = './user_id.txt';

class UserStorage {
    async saveUserId(userId) {
        await fs.writeFile(userFilePath, userId, 'utf8');
    }
    
    async getUserId() {
        if (existsSync(userFilePath)) {
            return await fs.readFile(userFilePath, 'utf8');
        }
        return null;
    }
}

export default UserStorage;