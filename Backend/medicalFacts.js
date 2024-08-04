import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import articles from './articles.json' assert { type: 'json' };
import seedrandom from 'seedrandom';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the file location
const FILELOCATION = path.join(__dirname, 'medicalFacts.txt');

export function getMedicalFact() 
{
    const fileData = readFile();
    checkCurrentDate(fileData);
    const lines = fileData.split('\n');
    const factCounter = Number(lines[0]);
    const fact = lines[factCounter];
    return fact;
}
export function getArticles()
{
    const articleIDS = getUniqueRandomNumbers(3, 0, articles.length - 1);
    const articleArray = [];
    articleIDS.forEach(id => 
    {
        articleArray.push(articles[id]);
    });
    return articleArray;
}

function getUniqueRandomNumbers(count, min, max) {
    const uniqueNumbers = new Set();
    const date = new Date();
    // Generate a seed based on the current date (YYYYMMDD format)
    const seed = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const rng = seedrandom(seed);
    
    while (uniqueNumbers.size < count)     
    {
        const number = Math.floor(rng() * (max - min + 1)) + min;
        uniqueNumbers.add(number);
    }
    
    return Array.from(uniqueNumbers);
}

function readFile() {
    try {
        const data = fs.readFileSync(FILELOCATION, 'utf8');
        return data;
    } catch (error) {
        console.error('Error reading the file:', error);
        return null;
    }
}

function checkCurrentDate(fileData) 
{
    const currentDate = getCurrentDate();
    const lines = fileData.split('\n');
    if (lines[1].trim() == currentDate) 
    {
        console.log("Date is current. No update needed.");
    } 
    else 
    {
        updateFactCounter(lines);
        updateFile(lines, 1, currentDate);
    }
}

function updateFile(lines, lineIndex, data) 
{
    try 
    {
        lines[lineIndex] = data;
        const updatedData = lines.join('\n');
        fs.writeFileSync(FILELOCATION, updatedData, 'utf8');
    }
    catch (error) 
    {
        console.error('Error updating the file:', error);
    }
}

function updateFactCounter(lines) 
{
    let factCounter = Number(lines[0]);
    if (factCounter >= 104) 
    {
        factCounter = 1;
    } else 
    {
        factCounter += 1;
    }
    lines[0] = factCounter.toString();
    updateFile(lines, 0, lines[0]);
}

function getCurrentDate() 
{
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
}


