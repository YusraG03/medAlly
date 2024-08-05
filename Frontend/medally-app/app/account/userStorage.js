import fs from 'fs';

const userFilePath = "./user-id.txt";

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
