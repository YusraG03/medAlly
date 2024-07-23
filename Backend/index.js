import express from 'express';
import bodyParser from 'body-parser';
import firebase from './firebase.js';

const app = express();
const PORT = 3000;
const db = new firebase();

app.use(bodyParser.json());


// (async () => {
//     try {
//       await db.testConnection();
//     } catch (error) {
//       console.error("Error connecting to Firebase:", error);
//     }
//   })();

app.get('/', (req, res) => 
{
    db.testConnection();
    res.send('Oweiss Gunga');
});

app.post('/login', async (req, res) => 
{
    await db.signIn(req.body.userDetails);
});

app.post('/register', async (req, res) => 
{
    console.log(req.body.userDetails);
    await db.signUp(req.body.userDetails);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

