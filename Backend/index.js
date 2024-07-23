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
    const message = await db.signIn(req.body.userCreds);
    res.json({"message": message});s
});

app.post('/register', async (req, res) => 
{
    const message = await db.signUp(req.body.userCreds);
    res.json({"message": message});
});

app.post('/addMedication', async (req, res) =>
{
    const message = await db.addMedication(req.body.medication, req.body.userCreds);
    res.json({"message": message});
});

app.post('/getAllMedication', async (req, res) =>
{
    const message = await db.getAllMedication(req.body.userCreds);
    res.json(message);
});

app.post('/', async (req, res) =>
{

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

