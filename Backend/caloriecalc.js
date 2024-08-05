import OpenAI from "openai";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config()

class caloriecalc{
    constructor(){
        this.openai = new OpenAI({ apiKey: process.env.openaikey });
    }
    async getCalorie(imagePath){ //if need question just ask me
        this.assistant = await this.openai.beta.assistants.retrieve("asst_I3bTUlZj5EKfWqv0gW44dOtH");
        this.thread = await this.openai.beta.threads.create();
        this.file = this.openai.files.create({
            file: imagePath,//fs.createReadStream(imagePath),
            purpose: "vision"
        })
        const file_id = (await this.file).id;
        this.message = await this.openai.beta.threads.messages.create(
            this.thread.id,
            {
                role: "user",
                content: [
                    {
                        type:"image_file",
                        image_file: {
                            file_id
                        }
                    }
                ],
            }
        )
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
            this.textvalue = this.lastmsg.content[0].text.value
        }
        return this.textvalue;
    }
}

export default caloriecalc;