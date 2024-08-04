import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

class generateThreadID{
    constructor(){
        this.openai = new OpenAI({ apiKey: process.env.openaikey})
    }

    async getThreadID(){
        this.newThread = await this.openai.beta.threads.create();
        return this.newThread.id;
    }
}

export default generateThreadID;