// Importing necessary libraries and components
import React, {useCallback, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Alert, View} from 'react-native';
import Header from '../Header/Header';
import {sendMessage} from '../../api/chatApi';
import {useRoute} from '@react-navigation/native';
const Chat = () => {

  // Accessing route parameters to retrieve agent data
  const route = useRoute();
  const agentData = route?.params?.agent || {};

  // State variables to manage messages and loading state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSend = useCallback(async (newMessages = []) => {
    let length = 8;
    // Ensure the agent ID is set before sending a messag
    if (!agentData?.id) {
      console.log('Agent ID is not set yet.');
      return;
    }
    try {
        // Append the new message to the current list of messages (local display)
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );

      // Set loading state to true while sending the message
      setLoading(true);

      // Send the message to the backend
      const newMessage = await sendMessage(agentData?.id, newMessages[0]?.text);
      console.log('🚀 ~ onSend ~ newMessage:', newMessage);
      const incomingMessage = {
        _id: Math.random()
          .toString(36)
          .substring(2, length + 2),
        text: newMessage[0]?.text,
        createdAt: new Date(),
        user: {
          _id: 3,
          name: newMessage[0]?.user,
        },
      };

      // Append the incoming message to the current list of messages
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, incomingMessage),
      );

      // Set loading state to false after processing
      setLoading(false);
    } catch (error) {
      // Log any errors and update the loading state
      setLoading(false);
      Alert.alert("Error!!",error?.message)
      console.log('something went wrong while sending message', error?.message);
    } finally {
        // Ensure loading is set to false in case of any issues
      setLoading(false);
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header component displaying the agent's name */}
      <Header backEnable={true} headerText={`${agentData?.name} AI Agent`} />

      {/* Chat interface provided by GiftedChat */}
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{_id: 1, name: 'Masood'}}
        isTyping={loading}
        renderUsernameOnMessage={true}
      />
    </View>
  );
};

export default Chat;
