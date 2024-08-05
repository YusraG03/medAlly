import fs from 'fs';
import path from 'path';

const userFilePath = path.join(__dirname, 'user_id.txt');

function saveUserId(userId) {
    fs.writeFileSync(userFilePath, userId, 'utf8');
}

function getUserId() {
    if (fs.existsSync(userFilePath)) {
        return fs.readFileSync(userFilePath, 'utf8');
    }
    return null;
}

module.exports = {
    saveUserId,
    getUserId
};