import OpenAI from "openai";
import dotenv from 'dotenv';
//import fs from 'fs';

dotenv.config();

class onetime{
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey: process.env.openaikey})
    }
    
    async getOneTime(userThreadID, userInfo) { //call this function within the created object with the user's message and their thread_id (use: "thread_DlQO7yZt4PvJOmMbz8D5zLhj" for testing)
        this.assistant = await this.openai.beta.assistants.retrieve("asst_vhKUyzAvbJVVETPj1J5tVoai");
        this.thread = await this.openai.beta.threads.retrieve(userThreadID);
        this.message = await this.openai.beta.threads.messages.create(
            this.thread.id,
            {
                role: "system",
                content: userInfo 
            }
        );
       
        let run = await this.openai.beta.threads.runs.createAndPoll(
            this.thread.id,
            {
                assistant_id: this.assistant.id
            }
        );
        if (run.status === 'completed') {
            this.messages = await this.openai.beta.threads.messages.list(
              run.thread_id,{order: 'desc',limit: 1}
            );
            this.lastmsg = await this.openai.beta.threads.messages.retrieve(this.thread.id,this.messages.data[0].id);
    
        }
    }
}

export default onetime;