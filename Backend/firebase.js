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
        }
        catch(error)
        {
            console.error('Error creating account:', error);
        }
    }
}

export default firebase;
