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
import cors from 'cors';
//prod
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

app.use(cors({
    origin: 'http://localhost:8081' // Replace with your frontend URL
  }));

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
    const message = await db.addMedication(req.body.medication, req.body.userID);
    res.json({"message": message});
});

app.post('/getAllMedication', async (req, res) =>
{
    const message = await db.getAllMedication(req.body.userID);
    res.json(message);
});

app.post('/modifyMedication', async (req, res) =>
{
    const message = await db.modifyMedication(req.body.medication, req.body.userID);
    res.json({"message": message});
});

app.post('/addUserBasicInfo', async (req, res) =>
{
    const message = await db.addUserBasicInfo(req.body.basicInfo, req.body.userID);
    res.json({"message": message});
});

app.post('/getUserBasicInfo', async (req, res) =>
{
    const message = await db.getUserBasicInfo(req.body.userID);
    res.json(message);
});

app.post('/modifyUserBasicInfo', async (req, res) =>
{
    const message = await db.modifyUserBasicInfo(req.body.basicInfo, req.body.userID);
    res.json({"message": message});
});

app.post('/addUserMedicalHistory', async (req, res) =>
{
    const message = await db.addUserMedicalHistory(req.body.medicalHistory, req.body.userID);
    res.json({"message": message});
});

app.post('/getUserMedicalHistory', async (req, res) =>
{
    const message = await db.getUserMedicalHistory(req.body.userID);
    res.json(message);
});

app.post('/modifyUserMedicalHistory', async (req, res) =>
{
    const message = await db.modifyUserMedicalHistory(req.body.medicalHistory, req.body.userID);
    res.json({"message": message});
});

app.post('/addUserNutrition', async (req, res) =>
{
    const message = await db.addUserNutrition(req.body.nutrition, req.body.userID);
    res.json({"message": message});
});

app.post('/getUserNutrition', async (req, res) =>
{
    const message = await db.getUserNutrition(req.body.userID);
    res.json(message);
});

app.post('/modifyUserNutrition', async (req, res) =>
{
    const message = await db.modifyUserNutrition(req.body.nutrition, req.body.userID);
    res.json({"message": message});
});

app.post('/addUserPhysicalHabits', async (req, res) =>
{
    const message = await db.addUserPhysicalHabbits(req.body.physicalHabits, req.body.userID);
    res.json({"message": message});
});

app.post('/getUserPhysicalHabits', async (req, res) =>
{
    const message = await db.getUserPhysicalHabbits(req.body.userID);
    res.json(message);
});

app.post('/modifyUserPhysicalHabits', async (req, res) =>
{
    const message = await db.modifyUserPhysicalHabbits(req.body.physicalHabits, req.body.userID);
    res.json({"message": message});
});
app.get('/getDailyMedicalFact', async (req, res) =>
{
    const message = getMedicalFact();
    res.json({"message": message});
});
app.post('/addUserDailyFoodIntake', async (req, res) =>
{
    const message = await db.addUserDailyFoodIntake(req.body.dailyFoodIntake, req.body.userID);
    res.json({"message": message});
});
app.post('/getUserDailyFoodIntake', async (req, res) =>
{
    const message = await db.getUserDailyFoodIntake(req.body.dateOfIntake, req.body.userID);
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
    const threadID = await db.getUserThreadID(req.body.userID);
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
            }
        });

        res.json({ message: message });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process the image' });
    }
});
app.post('/addUserDiagnosis', async (req, res) => {
    const message = await db.addUserDiagnosis(req.body.diagnosis, req.body.userID);
    res.json({"message": message});
});
app.post('/getUserDiagnosis', async (req, res) => {
    const message = await db.getUserDiagnosis(req.body.userID);
    res.json(message);
});
app.post('/getUserBMI', async(req, res) => {
    const message = await db.getUserBMI(req.body.userID);
    res.json(message);
});
app.post('/addUserFitness', async (req, res) => {
    const message = await db.addUserFitness(req.body.fitness, req.body.userID);
    res.json({"message": message});
});
app.post('/getUserFitness', async (req, res) => {
    const message = await db.getUserFitness(req.body.userID);
    res.json(message);
});
app.post('/getUserNextMedication', async (req, res) => {
    const message = await db.getUserNextMedication(req.body.userID);
    res.json(message);
});
app.post('/getTotalCaloriesNutrition', async (req, res) => {
    const message = await db.getTotalCaloriesNutrition(req.body.userID);
    res.json(message);
});
app.post('/addStepData', async (req, res) => {
    const message = await db.addStepData(req.body.stepData, req.body.userID);
    res.json({"message": message});
});
app.post('/getStepData', async (req, res) => {
    const message = await db.getStepData(req.body.userID);
    res.json(message);
});
app.post('/getUserFirstName', async (req, res) => {
    const message = await db.getUserFirstName(req.body.userID);
    res.json(message);
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});

    