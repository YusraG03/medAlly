import express from 'express';
import bodyParser from 'body-parser';
import firebase from './firebase.js';
import openaichat from './openai.js';

const app = express();
const PORT = 3000;
const db = new firebase();

app.use(bodyParser.json());

app.get('/', (req, res) => 
{
    db.testConnection();
    res.send('If you are reading this, then it works!');
});

app.post('/login', async (req, res) =>
{
    const message = await db.signIn(req.body.userCreds);
    res.json({"message": message});
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

app.post('/modifyMedication', async (req, res) =>
{
    const message = await db.modifyMedication(req.body.medication, req.body.userCreds);
    res.json({"message": message});
});

app.post('/addUserBasicInfo', async (req, res) =>
{
    const message = await db.addUserBasicInfo(req.body.basicInfo, req.body.userCreds);
    res.json({"message": message});
});

app.post('/getUserBasicInfo', async (req, res) =>
{
    const message = await db.getUserBasicInfo(req.body.userCreds);
    res.json(message);
});

app.post('/modifyUserBasicInfo', async (req, res) =>
{
    const message = await db.modifyUserBasicInfo(req.body.basicInfo, req.body.userCreds);
    res.json({"message": message});
});

app.post('/addUserMedicalHistory', async (req, res) =>
{
    const message = await db.addUserMedicalHistory(req.body.medicalHistory, req.body.userCreds);
    res.json({"message": message});
});

app.post('/getUserMedicalHistory', async (req, res) =>
{
    const message = await db.getUserMedicalHistory(req.body.userCreds);
    res.json(message);
});

app.post('/modifyUserMedicalHistory', async (req, res) =>
{
    const message = await db.modifyUserMedicalHistory(req.body.medicalHistory, req.body.userCreds);
    res.json({"message": message});
});

app.post('/addUserNutrition', async (req, res) =>
{
    const message = await db.addUserNutrition(req.body.nutrition, req.body.userCreds);
    res.json({"message": message});
});

app.post('/getUserNutrition', async (req, res) =>
{
    const message = await db.getUserNutrition(req.body.userCreds);
    res.json(message);
});

app.post('/modifyUserNutrition', async (req, res) =>
{
    const message = await db.modifyUserNutrition(req.body.nutrition, req.body.userCreds);
    res.json({"message": message});
});

app.post('/addUserPhysicalHabits', async (req, res) =>
{
    const message = await db.addUserPhysicalHabits(req.body.physicalHabits, req.body.userCreds);
    res.json({"message": message});
});

app.post('/getUserPhysicalHabits', async (req, res) =>
{
    const message = await db.getUserPhysicalHabbits(req.body.userCreds);
    res.json(message);
});

app.post('/modifyUserPhysicalHabits', async (req, res) =>
{
    const message = await db.modifyUserPhysicalHabbits(req.body.physicalHabits, req.body.userCreds);
    res.json({"message": message});
});

app.post('/chat', async(req, res) => 
    {
        const { chat } = req.body
        const message = await openaichat.getChatCompletion(chat);
        res.json({ "message": message });
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

