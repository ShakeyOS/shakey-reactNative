import axios from "axios";
import { Alert } from "react-native";

export const sendMessage = async (agentId, text) => {
  try {
    const response = await axios.post(`/${agentId}/message`, {text: text});
    return response.data;
  } catch (error) {
    console.log('Something went wrong while sending Message!!', error?.messgae);
    Alert.alert('Error!!', error?.messgae);
  }
};
