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
    async addUserMedicalHistory(medicalHistory, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserMedicalHistory`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medicalHistory, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error storing medical history:', error);
        }
    }
    async getUserMedicalHistory(userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserMedicalHistory`, 
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
            console.error('Error getting medical history:', error);
        }
    }
    async modifyUserMedicalHistory(medicalHistory, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserMedicalHistory`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medicalHistory, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error modifying medical history:', error);
        }
    }
    async addUserNutrition(nutrition, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserNutrition`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nutrition, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        }
        catch (error) 
        {
            console.error('Error storing nutrition:', error);
        }
          
    }
    async getUserNutrition(userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserNutrition`, 
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
        catch(error) 
        {
            console.error('Error getting nutrition:', error);
        }
    }
    async modifyUserNutrition(nutrition, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserNutrition`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nutrition, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error modifying nutrition:', error);
        }
    }
    async getDailyMedicalFact()
    {
        try 
        {
            const response = await fetch(`${this.url}/getDailyMedicalFact`);
            const data = await response.text();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error getting daily medical fact:', error);
        }
    }
    async getArticles()
    {
        try 
        {
            const response = await fetch(`${this.url}/getDailyArticles`);
            const data = await response.json();
            console.log(data);
        }
        catch (error) 
        {
            console.error('Error getting articles:', error);
        }
    }
    async chatWithGPT(chat, userCreds)
    {
        try 
        {
            const response = await fetch(`${this.url}/chat`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat, userCreds }),
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) 
        {
            console.error('Error chatting with GPT:', error);
        }
    }
    async calculateCaloriesFromImage(file)
    {
        //kapav bsn debug ici depending on what is being sent nek apel moi lerla
        const formData = new FormData();
        formData.append('image', file);
        try 
        {
            const response = await fetch(`${this.url}/upload`, 
            {
                method: 'POST',
                body: formData, 
            });
            const data = await response.json();
            console.log(data);
        }
        catch (error) 
        {
            console.error('Error calculating calories:', error);
        }
    }
}
export default APIEndpoint;   