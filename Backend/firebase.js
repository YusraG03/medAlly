import admin from 'firebase-admin'
import dotenv from 'dotenv';

dotenv.config();

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
    async signUp(accountDetails)
    {
        try
        {
            const ref = this.db.collection('users').doc(accountDetails.email);
            await ref.set(accountDetails);
            const isEmailTaken = this.checkIfEmailTaken(ref);

            if(isEmailTaken)
            {
                return("Email already taken!");
            }

            return("Account created successfully!");
        }
        catch(error)
        {
            console.error('Error creating account:', error);
        }
    }
    async signIn(accountDetails)
    {
        try 
        {
             
            
        } 
        catch (error) 
        {
            
        }
    }
    async checkIfEmailTaken(ref)
    {
        if (ref.exists) 
        {
            return true;
        }
        return false;
    }
}

export default firebase;
