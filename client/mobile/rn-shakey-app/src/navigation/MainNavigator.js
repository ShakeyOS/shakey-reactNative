import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

// StackNavigator component to define the app's navigation structure
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

// MainNavigator component serves as the primary navigator for the app
// It simply renders the StackNavigator component
const MainNavigator = () => {
  return (
    <SafeAreaView edges={['top', 'bottom', 'right', 'left']} style={{flex: 1}}>
      <StackNavigator />
    </SafeAreaView>
  );
};

export default MainNavigator;
