import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import axios from 'axios';
import MainNavigator from './src/navigation/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import '@walletconnect/react-native-compat';
import {WalletConnectModal} from '@walletconnect/modal-react-native';

const App = () => {
  axios.defaults.baseURL =
    Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://10.0.2.2:3000/';

  const projectId = 'e2b0a522f1630d3c160069657082a3bc';
  const providerMetadata = {
    name: 'rnshakeyosexample',
    description: 'First Mobile Ai Agent App',
    url: 'https://shakeyos.ai/',
    icons: ['https://shakeyos.ai/'],
    redirect: {
      native: 'rnshakeyosexample://',
      universal: 'https://shakeyos.ai',
    },
    chains: [1 || ''],
  };

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
      <NavigationContainer>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <MainNavigator />
        </KeyboardAvoidingView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
