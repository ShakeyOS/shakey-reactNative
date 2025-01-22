// Importing necessary libraries and hooks
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Component to display agent information in a card format
const AgentCard = ({agent = []}) => {
// Accessing the navigation object to handle navigation actions
const navigation = useNavigation();

// Function to handle "Chat" button press
const handleChatPress = () => {
    // Navigates to the 'Chat' screen with the agent details passed as parameters
    navigation.navigate('Chat', {agent: agent || 56612});
  };

  return (
    <View style={styles.cardContainer}>
      {/* Displaying the agent's name */}
      <Text style={styles.agentName}>{agent?.name}</Text>

      {/* Circle icon displaying the agent's initials */}
      <View style={styles.agentIconContainer}>

        {/* Extracting the initials from the agent's name or displaying default "RN" */}
        <Text style={styles.agentInitials}>
          {agent?.name
            ?.split(' ')
            ?.map(word => word[0])
            ?.join('')
            ?.toUpperCase() || 'RN'}
        </Text>
      </View>

      {/* Footer section containing buttons */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  agentName: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  agentIconContainer: {
    backgroundColor: '#333',
    height: 100,
    width: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  agentInitials: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems:"center"
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,

  },
  settingsButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
  },
  settingsIcon: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AgentCard;
