import fs from 'fs';

const userFilePath = './user_id.txt';

class UserStorage {
    async saveUserId(userId) {
        return new Promise((resolve, reject) => {
            fs.writeFile(userFilePath, userId, 'utf8', (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
    
    async getUserId() {
        return new Promise((resolve, reject) => {
            fs.access(userFilePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return resolve(null);
                }
                fs.readFile(userFilePath, 'utf8', (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            });
        });
    }
}

export default UserStorage;