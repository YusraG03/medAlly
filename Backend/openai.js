
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: 'sk-proj-pFdv80nGvXOzUW7XBb8mT3BlbkFJqUiQXZhgexNLydTNw5IX'})


async function main() {
    const assistant = await openai.beta.assistants.retrieve("asst_vhKUyzAvbJVVETPj1J5tVoai");
    const thread = await openai.beta.threads.retrieve("thread_6x9LXBslPmhLYfQno5yrGuEq"); //need to assign a thread to each user
    const chat = "hello"; // what the user will say to the bot
    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: chat 
        }
    );
   
    let run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        {
            assistant_id: assistant.id
        }
    );
    if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
          run.thread_id,{order: 'desc',limit: 1}
        );
        const lastmsg = await openai.beta.threads.messages.retrieve(thread.id,messages.data[0].id);
        const textvalue = lastmsg.content[0].text.value

        console.log(textvalue); 
        
        //from API Reference page (only used for testing)
        //for (const message of messages.data.reverse()) {
         // console.log(`${message.role} > ${message.content[0].text.value}`);
        //}
      //} else {
       // console.log(run.status);
    }

}

main();


