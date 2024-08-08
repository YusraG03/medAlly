import admin from 'firebase-admin'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { response } from 'express';

dotenv.config();

const SALT_ROUNDS = 1;

class firebase
{
    constructor()
    {
        admin.initializeApp({
            credential:admin.credential.cert({
                projectId:process.env.FIREBASE_PROJECT_ID,
                clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
                privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/, '\n')
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.asia-southeast1.firebaseio.com`
        });
        
        this.db = admin.firestore();
    }
    async testConnection(){
        console.log('Hello World')
    }
    async signUp(userCreds) 
    {
        try 
        {
            const userQuery = await this.db.collection('users').where('email', '==', userCreds.email).get();
    
            if (!userQuery.empty) {
                return "Email Already Exists!";
            }
    
            // Hash user password
            const hashedPassword = await bcrypt.hash(userCreds.password, SALT_ROUNDS);
            userCreds.password = hashedPassword;
    
            // Initialize ref after email check
            const ref = this.db.collection('users').doc();
            await ref.set(userCreds);

            const nutritionRef = ref.collection('nutrition').doc('placeholder');
            await nutritionRef.set({ initialized: true });
            
            return {
                message: "Account created successfully!",
                userID: ref.id
            };
        } catch (error) {
            console.error(error);
            return "An error occurred during sign-up.";
        }
    }
    async signIn(userCreds)
    {
        try {
            // Find the user document by email
            const userQuery = await this.db.collection('users').where('email', '==', userCreds.email).get();
            
            if (userQuery.empty) {
                return {
                    message:"Wrong Credentials!",
                    userID: null
                };
            }
    
            const userDoc = userQuery.docs[0];
            const userData = userDoc.data();
        
            // Check if the password matches
            if (await bcrypt.compare(userCreds.password, userData.password)) {
                return {
                    message: "Login successful!",
                    userID: userDoc.id // Return userID for future use
                };
            } else {
                return {
                    message:"Wrong Credentials!",
                    userID: null
                };
            }
    
        } catch (error) {
            console.error(error);
            return "An error occurred during sign-in.";
        }
    }
    async addMedication(medicationDetails, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medications').doc(medicationDetails.medicationName);
            await ref.set(medicationDetails);
            return("Medication added successfully!");
        }
        catch(error)
        {
            console.error('Error adding medication:', error);
            return "An error occurred during adding medication.";
        }
    }
    async getAllMedication(userID)
    {
        try 
        {
            const ref = this.db.collection('users').doc(userID).collection('medications');
            const snapshot = await ref.get();
        
            if (snapshot.empty) 
            {
                return('No medications found.');
            }
        
            const medications = [];

            snapshot.forEach(doc => {
                medications.push(doc.data());
            });
        
            return medications;
        } 
        catch (error) 
        {
            console.error('Error retrieving medications:', error);
            return [];
        }
    }
    async modifyMedication(medicationDetails, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medications').doc(medicationDetails.medicationName);
            // delete medication by setting freq to "delete"
            if(medicationDetails.freq === "delete")
            {
                await ref.delete();
                return("Medication deleted successfully!");
            }
            await ref.update(medicationDetails);
            return("Medication modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying medication:', error);
            return "An error occurred during modifying medication.";
        }
    }
    async addUserBasicInfo(userBasicInfo, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('basicInfo');
            await ref.set(userBasicInfo);
            return("Basic info added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user basic info:', error);
            return "An error occurred during adding basic info.";
        }
    }
    async getUserBasicInfo(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('basicInfo');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user basic info:', error);
            return "An error occurred during retrieving basic info.";
        }
    }
    async modifyUserBasicInfo(userBasicInfo, userID)
    {   
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('basicInfo');
            await ref.update(userBasicInfo);
            return("Basic info modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying user basic info:', error);
            return "An error occurred during modifying basic info.";
        }
    }
    async addUserMedicalHistory(userMedicalHistory, userID)
    {   
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('medicalHistory');
            await ref.set(userMedicalHistory);
            return ("Medical history added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user medical history:', error);
            return "An error occurred during adding medical history.";
        }
    }
    async getUserMedicalHistory(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('medicalHistory');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user medical history:', error);
            return "An error occurred during retrieving medical history.";
        }

    }
    async modifyUserMedicalHistory(userMedicalHistory, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('medicalHistory');
            await ref.update(userMedicalHistory);   
            return("Medical history modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying user medical history:', error);
            return "An error occurred during modifying medical history.";
        }
    }
    async addUserNutrition(userNutrition, userID)
    {
        try 
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('nutrition');
            await ref.set(userNutrition);
            return("Nutrition added successfully!");
        } 
        catch (error) 
        {
            console.error('Error adding user nutrition:', error);
            return "An error occurred during adding nutrition.";
        }
    }
    async getUserNutrition(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('nutrition');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user nutrition:', error);
            return "An error occurred during retrieving nutrition.";
        }
    }
    async modifyUserNutrition(userNutrition,userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('nutrition');
            await ref.update(userNutrition);
            return("Nutrition modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying user nutrition:', error);
            return "An error occurred during modifying nutrition.";
        }
    }
    async addUserPhysicalHabbits(userPhysicalHabbits, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('physicalHabbits');
            await ref.set(userPhysicalHabbits);
            return("Physical habbits added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user physical habbits:', error);
            return "An error occurred during adding physical habbits.";
        }
    }
    async getUserPhysicalHabbits(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('physicalHabbits');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user physical habbits:', error);
            return "An error occurred during retrieving physical habbits.";
        }
    }
    async modifyUserPhysicalHabbits(userPhysicalHabbits, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('physicalHabbits');
            await ref.update(userPhysicalHabbits);
            return("Physical habbits modified successfully!");
        }
        catch(error)    
        {
            console.error('Error modifying user physical habbits:', error);
            return "An error occurred during modifying physical habbits.";
        }
    }
    async addUserInjuryDrugs(userInjuryDrugs, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('injuryDrugs');
            await ref.set(userInjuryDrugs);
            return("Injury drugs added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user injury drugs:', error);
            return "An error occurred during adding injury drugs.";
        }
    }
    async getUserInjuryDrugs(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('injuryDrugs');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user injury drugs:', error);
            return "An error occurred during retrieving injury drugs.";
        }
    }
    async addUserChatConsultation(chatConsultation, userID)
    {
        try
        {
            const dateOfConsultation = new Date().toISOString();
            const ref = this.db.collection('users').doc(userID).collection('medicalHistory').doc(dateOfConsultation);
            await ref.set(chatConsultation);
            return("Chat consultation added successfully!");
        }
        catch(error)
        {
            console.error('Error adding chat consultation:', error);
            return "An error occurred during adding chat consultation.";
        }
    }
    async getUserChatConsultation(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalHistory');
            const snapshot = await ref.get();
        
            if (snapshot.empty) 
            {
                return('No chat consultations found.');
            }
        
            const chatConsultations = [];

            snapshot.forEach(doc => {
                chatConsultations.push(doc.data());
            });
        
            return chatConsultations;
        }
        catch(error)
        {
            console.error('Error retrieving chat consultations:', error);
            return "An error occurred during retrieving chat consultations.";
        }
    }
    async addUserDailyFoodIntake(mealType, dailyFoodIntake, userID) 
    {
        try 
        {
            const ref = this.db.collection('users').doc(userID).collection('nutrition').doc(mealType);
            await ref.set(dailyFoodIntake, { merge: true });
            return "Daily food intake added successfully!";
        } 
        catch (error) 
        {
            console.error('Error adding daily food intake:', error);
            return "An error occurred during adding daily food intake.";
        }
    }
    async getUserDailyFoodIntake(mealType, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('nutrition').doc(mealType);
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving daily food intake:', error);
            return "An error occurred during retrieving daily food intake.";
        }
    }
    async getUserThreadID(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID);
            const document = await ref.get();
            return document.data().threadID;
        }
        catch(error)
        {
            console.error('Error retrieving threadID:', error);
            return "An error occurred during retrieving threadID.";
        }
    }
    async addUserDiagnosis(diagnosis, userID) {
        try 
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalHistory').doc();
            
            // Add a timestamp to the diagnosis JSON
            diagnosis.timestamp = new Date().toISOString();
            
            await ref.set(diagnosis);
            return "Diagnosis added successfully!";
        } catch (error) {
            console.error('Error adding diagnosis:', error);
            return "An error occurred during adding diagnosis.";
        }
    }   
    async getUserDiagnosis(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalHistory').doc('diagnosis');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving diagnosis:', error);
            return "An error occurred during retrieving diagnosis.";
        }
    }
    async getUserBMI(userID) {
        try {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('basicInfo');
            const document = await ref.get();
            const basicInfo = document.data();
            const height = basicInfo.height / 100;
            const BMI = (basicInfo.weight / (height * height)).toFixed(1); // Apply toFixed to the result of the division
            console.log("BMI: ", BMI);
            return parseFloat(BMI); // Ensure the returned value is a number
        } catch (error) {
            console.error('Error retrieving BMI:', error);
            return "An error occurred during retrieving BMI.";
        }
    }
    async addUserFitness(userFitness, userID) 
    {
        try 
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('fitness');
            //merge = true to overwrite the existing data
            await ref.set(userFitness, { merge: true });
            return("Fitness added successfully!");
        } 
        catch (error)
        {
            console.error('Error adding fitness:', error);
            return "An error occurred during adding fitness.";
        }
    }
    async getUserFitness(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('fitness');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving fitness:', error);
            return "An error occurred during retrieving fitness.";
        }
    }
    async getUserNextMedication(userID) {
        try {
            const ref = this.db.collection('users').doc(userID).collection('medications');
            const snapshot = await ref.get();

            if (snapshot.empty) {
                return 'No medications found.';
            }
    
            const medications = [];
    
            snapshot.forEach(doc => {
                medications.push(doc.data());   
            });
    
            // Get the current time
            const now = new Date();

            const nextMedications = medications
            .filter(med => {
                const [hours, minutes] = med.time.split(':').map(Number);
                const medDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
                return medDateTime > now;
            })
            .sort((a, b) => {
                const [aHours, aMinutes] = a.time.split(':').map(Number);
                const [bHours, bMinutes] = b.time.split(':').map(Number);
                const aDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), aHours, aMinutes);
                const bDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), bHours, bMinutes);
                return aDateTime - bDateTime;
            });
            if(nextMedications.length === 0)
            {
                return{
                    isDone: true 
                };
            }
            // Return the next medication /
            return nextMedications[0];
        } catch (error) {
            console.error('Error getting next medication:', error);
            throw error;
        }
    }
    async getTotalCaloriesNutrition(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('nutrition');
            const snapshot = await ref.get();
        
            if (snapshot.empty) 
            {
                return('No nutrition data found.');
            }       
            
            let totalCalories = 0;
            let totalCarbs = 0;
            let totalProtein = 0;
            let totalFat = 0;
            
            snapshot.forEach(doc => {
                const data = doc.data();
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const item = data[key];
                        totalCalories += item.calories || 0;
                        totalCarbs += item.carbs || 0;
                        totalProtein += item.protein || 0;
                        totalFat += item.fat || 0;
                    }
                }
            });
    
            const response = {
                totalCalories: totalCalories,
                totalCarbs: totalCarbs,
                totalProtein: totalProtein,
                totalFat: totalFat
            };
    
            return response;
        }
        catch(error)
        {
            console.error('Error retrieving total calories:', error);
            return "An error occurred during retrieving total calories.";
        }
    }
    async addStepData(stepData, userID) {
        try {
            const date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const ref = this.db.collection('users').doc(userID).collection('fitness').doc(date);
            
            // Use set with { merge: false } to overwrite the document
            await ref.set(stepData, { merge: false });
            
            return "Step data added successfully!";
        } catch (error) {
            console.error('Error adding step data:', error);
            return "An error occurred during adding step data.";
        }
    }
    async getStepData(userID)
    {
        try
        {
            const date = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const ref = this.db.collection('users').doc(userID).collection('fitness').doc(date);
            const document = await ref.get();
            if(document.data() === undefined)
            {
                return "No step data recorded";
            }
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving step data:', error);
            return "An error occurred during retrieving step data.";
        }
    }
    async getUserFirstName(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID);
            const document = await ref.get();
            return document.data().firstName;
        }
        catch(error)
        {
            console.error('Error retrieving first name:', error);
            return "An error occurred during retrieving first name.";
        }
    }
    async getAllUserMedicalHistory(userID)
    {
        const userMedicalHistory = {
            basicInfo: await this.getUserBasicInfo(userID),
            medicalHistory: await this.getUserMedicalHistory(userID),
            nutrition: await this.getUserNutrition(userID),
            physicalHabbits: await this.getUserPhysicalHabbits(userID),
            injuryDrugs: await this.getUserInjuryDrugs(userID)
        };
        return(userMedicalHistory);
    }
}

export default firebase;
