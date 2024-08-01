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
            const ref = this.db.collection('users').doc(userCreds.email);
            const document = await ref.get();
            const isEmailTaken = await this.checkIfEmailExists(document);

            if(isEmailTaken)
            {
                return("Email already taken!");
            }

            //hash user password
            const hashedPassword = await bcrypt.hash(userCreds.password, SALT_ROUNDS);
            userCreds.password = hashedPassword;
        
            await ref.set(userCreds);
            return("Account created successfully!");
        }
        catch(error)
        {
            console.error('Error creating account:', error);
        }
    }
    async signIn(userCreds)
    {
        try 
        {
            const ref = this.db.collection('users').doc(userCreds.email);
            const document = await ref.get();
            const doesEmailExist = await this.checkIfEmailExists(document);

            if(!doesEmailExist)
            {
                return("Email does not exist!");
            }
            
            if(await bcrypt.compare(userCreds.password, document.data().password))
            {
                return("Login successful!");
            }
            else
            {
                return("Incorrect password!");
            }
            
        } 
        catch (error) 
        {
            console.log('Error signing in user:', error);
        }
    }
    async checkIfEmailExists(document)
    {   
        if (document.exists) 
        {   
            return true;
        }
        return false;
    }
    async addMedication(medicationDetails, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medications').doc(medicationDetails.medicationName);
            await ref.set(medicationDetails);
            return("Medication added successfully!");
        }
        catch(error)
        {
            console.error('Error adding medication:', error);
        }
    }
    async getAllMedication(userCreds)
    {
        try 
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medications');
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
    async modifyMedication(medicationDetails, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medications').doc(medicationDetails.medicationName);
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
    async addUserBasicInfo(userBasicInfo, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('basicInfo');
            await ref.set(userBasicInfo);
            return("Basic info added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user basic info:', error);
        }
    }
    async getUserBasicInfo(userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('basicInfo');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user basic info:', error);
        }
    }
    async modifyUserBasicInfo(userBasicInfo, userCreds)
    {   
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('basicInfo');
            await ref.update(userBasicInfo);
            return("Basic info modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying user basic info:', error);
        }
    }
    async addUserMedicalHistory(userMedicalHistory, userCreds)
    {   
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('medicalHistory');
            await ref.set(userMedicalHistory);
            return ("Medical history added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user medical history:', error);
        }
    }
    async getUserMedicalHistory(userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('medicalHistory');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user medical history:', error);
        }

    }
    async modifyUserMedicalHistory(userMedicalHistory, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('medicalHistory');
            await ref.update(userMedicalHistory);
            return("Medical history modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying user medical history:', error);
        }
    }
    async addUserNutrition(userNutrition, userCreds)
    {
        try 
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('nutrition');
            await ref.set(userNutrition);
            return("Nutrition added successfully!");
        } 
        catch (error) 
        {
            console.error('Error adding user nutrition:', error);
        }
    }
    async getUserNutrition(userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('nutrition');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user nutrition:', error);
        }
    }
    async modifyUserNutrition(userNutrition, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('nutrition');
            await ref.update(userNutrition);
            return("Nutrition modified successfully!");
        }
        catch(error)
        {
            console.error('Error modifying user nutrition:', error);
        }
    }
    async addUserPhysicalHabbits(userPhysicalHabbits, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('physicalHabbits');
            await ref.set(userPhysicalHabbits);
            return("Physical habbits added successfully!");
        }
        catch(error)
        {
            console.error('Error adding user physical habbits:', error);
        }
    }
    async getUserPhysicalHabbits(userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('physicalHabbits');
            const document = await ref.get();
            return document.data();
        }
        catch(error)
        {
            console.error('Error retrieving user physical habbits:', error);
        }
    }
    async modifyUserPhysicalHabbits(userPhysicalHabbits, userCreds)
    {
        try
        {
            const ref = this.db.collection('users').doc(userCreds.email).collection('medicalInfo').doc('physicalHabbits');
            await ref.update(userPhysicalHabbits);
            return("Physical habbits modified successfully!");
        }
        catch(error)    
        {
            console.error('Error modifying user physical habbits:', error);
        }
    }
}

export default firebase;
