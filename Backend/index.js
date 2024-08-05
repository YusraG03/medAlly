import express, { json } from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import firebase from './firebase.js';
import openaichat from './openai.js';
import {getMedicalFact, getArticles} from './medicalFacts.js';
import getThread from './generateThreadID.js';
import multer from 'multer';
import caloriecalc from './caloriecalc.js';

const openchat = new openaichat();
const newThread = new getThread();
const app = express();
const PORT = 3000;
const db = new firebase()
const calorie = new caloriecalc();
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    //limits: { fileSize: 1000000 }, // Limit file size to 1MB
});

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
    var jsonObject = (req.body.userCreds);
    const threadID = await newThread.getThreadID();
    jsonObject["threadID"] = threadID;
    const message = await db.signUp(jsonObject);
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
    const message = await db.addUserPhysicalHabbits(req.body.physicalHabits, req.body.userCreds);
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
app.get('/getDailyMedicalFact', async (req, res) =>
{
    const message = getMedicalFact();
    res.json({"message": message});
});
app.post('/addUserDailyFoodIntake', async (req, res) =>
{
    const message = await db.addUserDailyFoodIntake(req.body.dailyFoodIntake, req.body.userCreds);
    res.json({"message": message});
});
app.post('/getUserDailyFoodIntake', async (req, res) =>
{
    const message = await db.getUserDailyFoodIntake(req.body.dateOfIntake, req.body.userCreds);
    res.json(message);
});
app.get('/getDailyArticles', async (req, res) =>
{   
    const message = getArticles();
    res.json(message);
});

app.post('/chat', async(req, res) => 
{
    const { chat } = req.body
    const threadID = await db.getUserThreadID(req.body.userCreds);
    const message = await openchat.getChatCompletion(chat,threadID);
    res.json({ "message": message });
});

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json('No file uploaded.');
    }

    const imagePath = req.file.path;

    try {
        const message = await calorie.getCalorie(imagePath);

        // Delete the image after processing
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });

        res.json({ message: message });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process the image' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

