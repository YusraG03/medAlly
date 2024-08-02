// APIEndpoint.js
class APIEndpoint 
{
    constructor()
    {
        this.url = "http://localhost:3000";
    }
    async testConnection() 
    {
        try 
        {
            const response = await fetch(this.url);
            const data = await response.text();
            console.log('data');
        } 
        catch (error) 
        {
            console.error('Error connecting to API:', error);
        }
    }
    async registerUser(userCreds) 
    {
        try 
        {
            const response = await fetch(`${this.url}/register`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error registering user:', error);
        }
    }
    async loginUser(userCreds) 
    {
        try 
        {
            const response = await fetch(`${this.url}/login`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) 
        {
            console.error('Error logging in user:', error);
        }
    }
    async addMedication(medication, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/addMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medication, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error storing medication:', error);
        }
    }
    async modifyMedication(medication, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medication, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error modifying medication:', error);
        }
    }
    async getAllMedication(userCreds) 
    {
        try 
        {
            const response = await fetch(`${this.url}/getAllMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error getting medication:', error);
        }
    }
    async addUserBasicInfo(basicInfo, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserBasicInfo`, 
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ basicInfo, userCreds }),
            });
            const data = await response.json();
            console.log(data);    
        } 
        catch (error) 
        {
            console.error('Error storing basic info:', error);
        }
    }
    async getUserBasicInfo(userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserBasicInfo`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error getting basic info:', error);
        }
    }
    async modifyUserBasicInfo(basicInfo, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserBasicInfo`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ basicInfo, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error modifying basic info:', error);
        }
    }
    as
}

// const test = new APIEndpoint();
// test.addMedication({"medicationName":"portlouis"},{"email":"example@gmail.com"});

//export default APIEndpoint;   