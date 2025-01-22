import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
import MainNavigator from './src/navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {WalletConnectModal} from '@walletconnect/modal-react-native';

const App = () => {
  // Setting the default base URL for all Axios API requests
  // This URL should point to the backend server (adjust for production environments)
  axios.defaults.baseURL =
    Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://10.0.2.2:3000/';

  const projectId = 'e2b0a522f1630d3c160069657082a3bc';
  const providerMetadata = {
    name: 'shakeyrn',
    description: 'Mobile Ai Agent App',
    url: 'https://shakeyos.ai/',
    icons: ['https://shakeyos.ai/'],
    redirect: {
      native: 'shakeyrn://',
      universal: 'https://shakeyos.ai',
    },
    chains: [1 || ''],
  };

  return (
    // Providing a context for safe areas (e.g., notches, status bars)
    <SafeAreaProvider style={{flex: 1}}>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
      {/* Navigation container to manage app navigation */}

      <NavigationContainer>
        {/* KeyboardAvoidingView to prevent the keyboard from overlapping input fields */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {/* MainNavigator handles the navigation stack of the app */}
          <MainNavigator />
        </KeyboardAvoidingView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
