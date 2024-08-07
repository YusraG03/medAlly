// APIEndpoint.js
class APIEndpoint 
{   
    constructor()
    {
        //this.url = "http://localhost:3000";
        this.url = "http://medally.ddns.net:3000";
    }
    async testConnection() 
    {
        try 
        {
            const response = await fetch(this.url);
            const data = await response.text();
            return('data');
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
            return(data);
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
            return(data);
        } catch (error) 
        {
            console.error('Error logging in user:', error);
        }
    }
    async addMedication(medication, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medication, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing medication:', error);
        }
    }
    async modifyMedication(medication, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medication, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error modifying medication:', error);
        }
    }
    async getAllMedication(userID) 
    {
        try 
        {
            const response = await fetch(`${this.url}/getAllMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting medication:', error);
        }
    }
    async addUserBasicInfo(basicInfo, userID)
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
                body: JSON.stringify({ basicInfo, userID }),
            });
            const data = await response.json();
            return(data);    
        } 
        catch (error) 
        {
            console.error('Error storing basic info:', error);
        }
    }
    async getUserBasicInfo(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserBasicInfo`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting basic info:', error);
        }
    }
    async modifyUserBasicInfo(basicInfo, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserBasicInfo`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ basicInfo, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error modifying basic info:', error);
        }
    }
    async addUserMedicalHistory(medicalHistory, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserMedicalHistory`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medicalHistory, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing medical history:', error);
        }
    }
    async getUserMedicalHistory(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserMedicalHistory`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting medical history:', error);
        }
    }
    async modifyUserMedicalHistory(medicalHistory, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserMedicalHistory`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ medicalHistory, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error modifying medical history:', error);
        }
    }
    async addUserNutrition(nutrition, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserNutrition`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nutrition, userID }),
            });
            const data = await response.json();
            return(data);
        }
        catch (error) 
        {
            console.error('Error storing nutrition:', error);
        }
          
    }
    async getUserNutrition(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserNutrition`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        }
        catch(error) 
        {
            console.error('Error getting nutrition:', error);
        }
    }
    async modifyUserNutrition(nutrition, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserNutrition`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nutrition, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error modifying nutrition:', error);
        }
    }
    async addUserPhysicalHabbits(physicalHabbits, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserPhysicalHabits`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ physicalHabbits, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing physical habits:', error);
        }
    }
    async getUserPhysicalHabbits(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserPhysicalHabits`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting physical habits:', error);
        }
    }
    async modifyUserPhysicalHabbits(physicalHabbits, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/modifyUserPhysicalHabits`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ physicalHabbits, userID }),
            });
            const data = await response.json();
            return(data);
        }
        catch (error)
        {
            console.error('Error modifying physical habbits', error);
        }
    }
    async getDailyMedicalFact()
    {
        try 
        {
            const response = await fetch(`${this.url}/getDailyMedicalFact`);
            const data = await response.text();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting daily medical fact:', error);
        }
    }
    async getArticles() {
        try {
          const response = await fetch(`${this.url}/getDailyArticles`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          return('API response data:', data); // Log the data to understand its structure
    
          // Assuming the JSON structure is { articles: [...] }
          const articles = data || []; // Adjust this line based on your actual JSON structure
          return Array.isArray(articles) ? articles : []; // Ensure it's an array
        } catch (error) {
          console.error('API fetch error:', error);
          return []; // Return an empty array if there's an error
        }
      }
    async chatWithGPT(chat, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/chat`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chat, userID }),
            });
            const data = await response.json();
            return(data);
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
            return(data);
        }
        catch (error) 
        {
            console.error('Error calculating calories:', error);
        }
    }
    async addUserDailyFoodIntake(foodIntake, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserDailyFoodIntake`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ foodIntake, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing food intake:', error);
        }
    }
    async getUserDailyFoodIntake(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserDailyFoodIntake`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        }
        catch (error)
        {
            console.error('Error getting food intake:', error);
        }
    }
    async addUserDiagnosis(diagnosis, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserDiagnosis`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ diagnosis, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing diagnosis:', error);
        }
    }
    async getUserDiagnosis(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserDiagnosis`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting diagnosis:', error);
        }
    }
    async getUserBMI(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserBMI`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting BMI:', error)
        }
    }
    async addUserFitness(fitness, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addUserFitness`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fitness, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing fitness:', error);
        }
    }
    async getUserFitness(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserFitness`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting fitness:', error);
        }
    }
    //most likely pou ggn problem ek sa nek fer moi conner :)
    async getUserNextMedication(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getUserNextMedication`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting next medication:', error);
        }
    }
    async getTotalCaloriesNutrition(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getTotalCaloriesNutrition`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting total calories:', error);
        }
    }
    async addStepData(stepData, userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/addStepData`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stepData, userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error storing step data:', error);
        }
    }
    async getStepData(userID)
    {
        try 
        {
            const response = await fetch(`${this.url}/getStepData`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID }),
            });
            const data = await response.json();
            return(data);
        } 
        catch (error) 
        {
            console.error('Error getting step data:', error);
        }
    }
}
export default APIEndpoint;   