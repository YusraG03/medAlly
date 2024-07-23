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
                privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.asia-southeast1.firebaseio.com`
        });
        
        this.db = admin.firestore();
    }
    async testConnection()
    {
        try {
            const ref = this.db.collection('test').doc('data');
            await ref.set({ message: 'Hello from Firebase!' });
            console.log('Write successful!');
          } catch (error) {
            console.error('Write failed:', error);
          }
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

}

export default firebase;
