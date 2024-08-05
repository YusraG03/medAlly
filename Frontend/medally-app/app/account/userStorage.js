import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const fileExists = promisify(fs.exists);

const userFilePath = './user_id.txt';

class UserStorage {
    async saveUserId(userId) {
        await writeFile(userFilePath, userId, 'utf8');
    }
    
    async getUserId() {
        const exists = await fileExists(userFilePath);
        if (exists) {
            return await readFile(userFilePath, 'utf8');
        }
        return null;
    }
}

export default UserStorage;