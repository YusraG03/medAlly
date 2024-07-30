import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class OpenAIChat {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    

    async getChatCompletion(message) {

        const prompt =  'You are a medical assisstant chatbot. Only discuss symptoms, medicinal topics and the users health. DO NOT discuss anything else. You are Symtom Checker. User: ${message}. Bot:'
        
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: 'system', content: prompt }],
            model: 'gpt-4o-mini',
            max_tokens: 150,
            stop: ["User: ", "Bot: "],
        });
    
        return completion.choices[0].message.content.trim();
    }
}

const openaiClient = new OpenAIChat(process.env.OPENAI_API_KEY);

export default openaiClient;