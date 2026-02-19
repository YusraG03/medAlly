import OpenAI from "openai";
import dotenv from 'dotenv';
//import fs from 'fs';

dotenv.config();

class openaichat{
    constructor(apiKey) {
        const key = process.env.openaikey || process.env.OPENAI_API_KEY;
        if (!key) {
            console.warn('WARNING: OpenAI API key not set. OpenAI features will be disabled.');
            this.openai = null;
        } else {
            this.openai = new OpenAI({ apiKey: key });
        }
    }
    
    async getChatCompletion(chat, userThreadID) {
        try {
            console.log('getChatCompletion called with:', { chat, userThreadID });
            if (!this.openai) {
                console.warn('OpenAI client not initialized. getChatCompletion will not run.');
                return { response: null, error: 'OpenAI client not initialized.' };
            }
            const assistantId = process.env.OPENAI_ASSISTANT_ID || "asst_jBMkGYPSKIwqTGax8tet9RCE";
            console.log('Using assistantId:', assistantId);
            this.assistant = await this.openai.beta.assistants.retrieve(assistantId);
            // Create a new thread if userThreadID is undefined or empty
            if (!userThreadID) {
                this.thread = await this.openai.beta.threads.create();
            } else {
                this.thread = await this.openai.beta.threads.retrieve(userThreadID);
            }
            console.log('Thread ID:', this.thread.id);
            this.message = await this.openai.beta.threads.messages.create(
                this.thread.id,
                {
                    role: "user",
                    content: chat
                }
            );
            console.log('Message created:', this.message);

            let run = await this.openai.beta.threads.runs.createAndPoll(
                this.thread.id,
                {
                    assistant_id: this.assistant.id
                }
            );
            console.log('Run status:', run.status);
            if (run.status === 'completed') {
                this.messages = await this.openai.beta.threads.messages.list(
                    run.thread_id, { order: 'desc', limit: 1 }
                );
                this.lastmsg = await this.openai.beta.threads.messages.retrieve(this.thread.id, this.messages.data[0].id);
                this.textvalue = this.lastmsg.content[0].text.value
                console.log('OpenAI last message:', this.textvalue);

                // Extract JSON if present
                const jsonMatch = this.textvalue.match(/```json([\s\S]*?)```/);
                if (jsonMatch && jsonMatch[1]) {
                    const jsonData = JSON.parse(jsonMatch[1].trim());
                    return { response: jsonData, thread_id: this.thread.id };
                } else {
                    return { response: this.textvalue, thread_id: this.thread.id };
                }
            } else {
                console.log('OpenAI run not completed:', run);
                return { response: null, error: `OpenAI run status: ${run.status}` };
            }
        } catch (error) {
            console.error('Error in getChatCompletion:', error);
            return { response: null, error: error.message || 'Unknown error from OpenAI.' };
        }
    }
}

export default openaichat;

