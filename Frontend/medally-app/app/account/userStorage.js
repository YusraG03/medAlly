import fs from 'fs';

const userFilePath = "./user-id.txt";

export function saveUserId(userId) {
    fs.writeFileSync(userFilePath, userId, 'utf8');
}

export function getUserId() {
    if (fs.existsSync(userFilePath)) {
        return fs.readFileSync(userFilePath, 'utf8');
    }
    return null;
}
