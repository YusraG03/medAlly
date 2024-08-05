import fs from 'fs';

const userFilePath = 'user_id.txt';

class UserStorage {
    saveUserId(userId) {
        fs.writeFileSync(userFilePath, userId, 'utf8');
    }
    
    getUserId() {
        if (fs.existsSync(userFilePath)) {
            return fs.readFileSync(userFilePath, 'utf8');
        }
        return null;
    }
}

export default UserStorage;