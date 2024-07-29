import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { Button, View, Text, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';
import OpenAI from 'openai';
import Markdown from 'react-native-markdown-display';
import { FontSize, FontFamily, Color } from '../_assets/textStyles';

import aiAvatar from '../app/_assets/Avatar.png'; // Path to AI avatar
import userAvatar from '../app/_assets/user-profile-03.png'; // Path to User avatar

const OPENAI_API_KEY = 'sk-proj-4wy3Le0Xo5ClbgpoJWwxT3BlbkFJTxNM15c8cqR3XAm7ktOh'; 
const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const initialMessage = {
      _id: uuid.v4(),
      text: "Hello! Type in what symptoms you are currently experiencing below so we can start with your diagnosis.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'AI Assistant',
        avatar: aiAvatar,
      },
    };
    setMessages([initialMessage]);
  }, []);

  const fetchAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);
      const response = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a chatbot within a Medical Mobile Application whose task is to help the user diagnose their disease upon any symptom they provide. You are allowed to ask the user short but related questions as to properly come to a conclusion as to what sickness the user has.' },
          { role: 'user', content: userMessage },
        ],
        model: 'gpt-4',
      });

      const aiMessage = response.choices[0].message.content;
      const newMessage = {
        _id: uuid.v4(),
        text: aiMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Assistant',
          avatar: aiAvatar,
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
    const textColor = currentMessage.user._id === 1 ? Color.secondaryText : Color.highlightText;
    const fontFamily = FontFamily.contentText;
    const fontSize = FontSize.contentText_size;

    return (
      <Markdown
        style={{
          body: {
            marginHorizontal: 10,
            fontSize,
            color: textColor,
            fontFamily,
            letterSpacing: -0.6,
            lineHeight: 18,
          },
        }}
      >
        {currentMessage.text}
      </Markdown>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#dcf8c6' },
          left: { backgroundColor: '#ffffff' },
        }}
      />
    );
  };

  const renderAvatar = (props) => {
    return <Avatar {...props} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Symptom Checker</Text>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          avatar: userAvatar,
        }}
        renderMessageText={CustomMessageText}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        isTyping={isTyping}
      />
      <Button
        title="View History"
        onPress={() => navigation.navigate('HistoryScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.screenTitle_size,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: '800',
    fontFamily: FontFamily.screenTitle,
    color: Color.defaultBlack,
    textAlign: 'left',
    margin: 10,
  },
});

export default ChatScreen;
