import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

class openaichat{
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey: process.env.openaikey})
    }
    async getChatCompletion(chat, userThreadID) {  //call this function within the created object with the user's message and their thread_id (use: "thread_DlQO7yZt4PvJOmMbz8D5zLhj" for testing)
        this.assistant = await this.openai.beta.assistants.retrieve("asst_vhKUyzAvbJVVETPj1J5tVoai");
        this.thread = await this.openai.beta.threads.retrieve(userThreadID);
        this.message = await this.openai.beta.threads.messages.create(
            this.thread.id,
            {
                role: "user",
                content: chat 
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
            const textvalue = this.lastmsg.content[0].text.value
    
            console.log(textvalue); 
            
            //from API Reference page (only used for testing)
            //for (const message of messages.data.reverse()) {
             // console.log(`${message.role} > ${message.content[0].text.value}`);
            //}
          //} else {
           // console.log(run.status);
        }
    
    }
}


export default openaichat;

