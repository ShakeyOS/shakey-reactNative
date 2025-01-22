import axios from 'axios';
import { Alert } from 'react-native';

export const fetchChatMessages = async agentId => {
  try {
    const response = await axios.get(`/chats/${agentId}/messages`);
    return response.data;
  } catch (error) {
    console.log(
      'something went wrong while fetching chat messages!!',
      error?.message,
    );
  }
};

export const sendMessage = async (agentId, text) => {
  console.log("🚀 ~ sendMessage ~ agentId, text:", agentId, text)
  try {
    const response = await axios.post(`/${agentId}/message`, {text: text});
    return response.data;
  } catch (error) {
    console.log('Something went wrong while sending Message!!', error?.messgae);
    Alert.alert('Error!!', error?.messgae);
  }
};

export const fetchAgents = async () => {
  try {
    const response = await axios.get(`/agents`);
    return response.data;
  } catch (error) {
    console.log('something went wrong while fetching Agents!!', error?.message);
    Alert.alert("Error",error?.message)
  }
};
