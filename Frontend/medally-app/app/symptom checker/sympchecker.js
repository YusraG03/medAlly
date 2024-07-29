import React, { useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import OpenAI from 'openai';
import Markdown from 'react-native-markdown-display';

// Directly set your API key here
const OPENAI_API_KEY = 'org-awp2FP9NKCOWoX0cW6iyk875';
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-4', // Use the correct model name, e.g., 'gpt-4'
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
