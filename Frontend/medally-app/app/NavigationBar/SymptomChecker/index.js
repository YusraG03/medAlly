import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Avatar, InputToolbar, Send } from 'react-native-gifted-chat';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import uuid from 'react-native-uuid';
import OpenAI from 'openai';
import Markdown from 'react-native-markdown-display';
import textStyles from '../../_assets/textStyles';
import { router, Link } from 'expo-router';
import colors from '../../_assets/colors';
import APIEndpoint from '../../API';
import { useRouter } from 'expo-router';


// Import local images
import aiAvatar from '../../_assets/Avatar.png'; // Path to AI avatar
import userAvatar from '../../_assets/user-profile-03.png'; // Path to User avatar


export function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const initialMessage = {
      _id: uuid.v4(),
      text: "Hello! Type in what symptoms you are currently experiencing below so we can start with your diagnosis.",
      user: {
        _id: 2,
        name: 'AI Assistant',
        avatar: aiAvatar,
      },
    };
    setMessages([initialMessage]);
  }, []);

  const API = new APIEndpoint()
  const fetchAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);
      const response = await API.chatWithGPT(userMessage, '1yqpFppDMfYgevo7isXH')
      if(response.message && response.message.likelihood){
        console.log(response)
        // Pass the response data as params
        router.push({
          pathname: './SymptomChecker/results',
          params: {
            ...response.message,
            treatments: JSON.stringify(response.message.treatments)
          }
        });
      }
      else{
        const aiMessage = response.message;
        console.log(response)
        const newMessage = {
          _id: uuid.v4(),
          text: aiMessage,
          user: {
            _id: 2,
            name: 'AI Assistant',
            avatar: aiAvatar,
          }
      }
      setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
      };
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
    const textColor = currentMessage.user._id === 1 ? colors.secondaryText : colors.highlightText;

    return (
      <Markdown
        style={{
          body: {
            marginHorizontal: 10,
            fontSize: textStyles.contentText.fontSize,
            color: textColor,
            fontFamily: textStyles.contentText.fontFamily,
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
          //can this be removed? please check :p
          right: { backgroundColor: colors.defaultwhite },
          left: { backgroundColor: colors.defaultwhite },
        }}
        containerStyle={{
          right: {
            margin: 0,
          },
          left: {
            margin: 0,
          },
        }}
      />
    );
  };

  const renderAvatar = (props) => {
    const { position } = props;
    return (
      <Avatar
        {...props}
        containerStyle={{
          left: { margin: 0},
          right: { margin: 0 },
        }}
        imageStyle={{
          left: { width: 25, height: 25 },
          right: { width: 25, height: 25 },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
      />
    );
  };

  const renderDay = () => {
    return null;
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Image 
            source={require('../../_assets/send-01.png')} 
            style={styles.sendlogo}
          />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.screenTitle}>Symptom Checker</Text>
        <Pressable onPress={() => router.push('./SymptomChecker/historyscreen')}>
        <Image 
            source={require('../../_assets/clock-forward.png')} 
            style={styles.logo}
          />
        </Pressable>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          avatar: userAvatar, // Use the local avatar for the user
        }}
        renderMessageText={CustomMessageText}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        isTyping={isTyping}
        showUserAvatar={true}
        renderInputToolbar={renderInputToolbar}
        renderDay={renderDay}
        renderSend={renderSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.defaultwhite,
    marginTop: '2%',
    marginHorizontal: '2.5%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.defaultwhite,
    flexDirection: 'column',
    justifyContent: 'flex-end', // Ensure content is aligned to the bottom
  },
  historyIcon: {
    marginRight: 10,
  },
  avatar: {
    width: 25,
    height: 25,
  },
  logo: {
    width: 25,
    height: 25,
    justifyContent: 'center',
  },
  sendlogo: {
    width: 25,
    height: 25,
  },
  inputToolbar: {
    borderColor : colors.inactivegrey,
    justifyContent: 'center',
    paddingHorizontal : '2.5%',
    fontFamily : textStyles.contentText.fontFamily
  },
  
  sendingContainer: {
    borderWidth: 0,
  },
});

export default ChatScreen;
