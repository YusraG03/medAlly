import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import OpenAI from 'openai';
import Markdown from 'react-native-markdown-display';

// Directly set your API key here
const OPENAI_API_KEY = 'sk-proj-4wy3Le0Xo5ClbgpoJWwxT3BlbkFJTxNM15c8cqR3XAm7ktOh'; // Update with the correct API key
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a chatbot within a Medical Mobile Application whose task is to help the user diagnose their disease upon any symptom they provide. You are allowed to ask the user short but related questions as to properly come to a conclusion as to what sickness the user has.' },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-4', // Use the correct model name
      });

      const aiMessage = response.choices[0].message.content;
      const newMessage = {
        _id: uuid.v4(), // Generate a random ID
        text: aiMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Assistant',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };

      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
    } catch (error) {
      console.error('Error fetching AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text;
    fetchAIResponse(userMessage);
  }, []);

  const CustomMessageText = (props) => {
    const { currentMessage } = props;
    const textColor = currentMessage.user._id === 1 ? 'white' : 'black';

    return (
      <Markdown
        style={{
          body: {
            marginHorizontal: 10,
            fontSize: 16,
            color: textColor,
          },
        }}
      >
        {currentMessage.text}
      </Markdown>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderMessageText={CustomMessageText}
      isTyping={isTyping}
    />
  );
}

export default ChatScreen;
