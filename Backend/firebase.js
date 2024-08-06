import admin from 'firebase-admin'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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
                return "Wrong Credentials!";
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
                return "Wrong Credentials!";
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
        }
    }
    async addUserDailyFoodIntake(dailyFoodIntake, userID)
    {
        try
        {
            const dateOfIntake = new Date().toLocaleDateString();
            const ref = this.db.collection('users').doc(userID.collection('nutrition').doc(dateOfIntake));
            await ref.set(dailyFoodIntake);
            return("Daily food intake added successfully!");
        }
        catch(error)
        {
            console.error('Error adding daily food intake:', error);
        }
    }
    async getUserDailyFoodIntake(dateOfIntake,userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('nutrition').doc(dateOfIntake);
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving daily food intake:', error);
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
        }
    }
    async addUserDiagnosis(diagnosis, userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalHistory').doc('diagnosis');
            await ref.set(diagnosis);
            return("Diagnosis added successfully!");
        }
        catch(error)    
        {
            console.error('Error adding diagnosis:', error);
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
        }
    }
    async getUserBMI(userID)
    {
        try
        {
            const ref = this.db.collection('users').doc(userID).collection('medicalInfo').doc('basicInfo');
            const document = await ref.get();
            const basicInfo = document.data();
            const height = basicInfo.height/100;
            return (basicInfo.weight / (height * height));
        }
        catch(error)
        {
            console.error('Error retrieving BMI:', error);
        }

    }
}

export default firebase;
