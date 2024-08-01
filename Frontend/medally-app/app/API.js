// APIEndpoint.js
export default class APIEndpoint {
    constructor() {
        this.url = "http://localhost:3000"; // Replace with your actual URL
    }
    async testConnection() {
        try {
            const response = await fetch(this.url);
            const data = await response.text();
            console.log('data');
        } catch (error) {
            console.error('Error connecting to API:', error);
        }
    }
    async registerUser(userCreds) {
        try {
            const response = await fetch(`${this.url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    async loginUser(userCreds) {
        try {
            const response = await fetch(`${this.url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    }
}
