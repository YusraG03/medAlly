import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class OpenAIChat {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async getChatCompletion(message) {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: 'system', content: message }],
            model: 'gpt-4o-mini',
        });
        return completion.choices[0].message.content;
    }
}

const openaiClient = new OpenAIChat(process.env.OPENAI_API_KEY);

export default openaiClient;