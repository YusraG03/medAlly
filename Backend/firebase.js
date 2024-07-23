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
    async signUp(accountDetails)
    {
        try
        {
            const ref = this.db.collection('users').doc(accountDetails.email);
            const document = await ref.get();
            const isEmailTaken = await this.checkIfEmailExists(document);

            if(isEmailTaken)
            {
                return("Email already taken!");
            }

            //hash user password
            const hashedPassword = await bcrypt.hash(accountDetails.password, SALT_ROUNDS);
            accountDetails.password = hashedPassword;
        
            await ref.set(accountDetails);
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
            const ref = this.db.collection('users').doc(accountDetails.email);
            const document = await ref.get();
            const doesEmailExist = await this.checkIfEmailExists(document);

            if(!doesEmailExist)
            {
                return("Email does not exist!");
            }
            
            if(await bcrypt.compare(accountDetails.password, document.data().password))
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

}

export default firebase;
