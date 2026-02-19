import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

class generateThreadID{
    constructor(){
        const key = process.env.openaikey || process.env.OPENAI_API_KEY;
        if (!key) {
            console.warn('WARNING: OpenAI API key not set. OpenAI features will be disabled.');
            this.openai = null;
        } else {
            this.openai = new OpenAI({ apiKey: key });
        }
    }

    async getThreadID(){
        if (!this.openai) {
            console.warn('OpenAI client not initialized. getThreadID will not run.');
            return null;
        }
        this.newThread = await this.openai.beta.threads.create();
        return this.newThread.id;
    }
}

export default generateThreadID;