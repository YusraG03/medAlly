import fs from 'fs';

const userFilePath = "./user-id.txt";

class saveUser{
    async saveUserId(userId) {
        fs.writeFileSync(userFilePath, userId, 'utf8');
    }
    
    async getUserId() {
        if (fs.existsSync(userFilePath)) {
            return fs.readFileSync(userFilePath, 'utf8');
        }
        return null;
    }
    
}

export default saveUser;