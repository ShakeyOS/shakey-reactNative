import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PageContainer from '../../components/PageContainer';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AgentCard from '../../components/Cards/AgentCard';
import useFetch from '../../utils/hooks/useFetch';
import CustomBtn from '../../components/CustomButton';
import {useWalletConnectModal} from '@walletconnect/modal-react-native';

const EmptyList = ({message = 'No agents found'}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search-off" size={48} color="gray" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const ChatListScreen = () => {
  const {data, loading, error, refreshing, onRefresh} = useFetch('/agents');

  const {isOpen, open, close, provider, isConnected, address} =
    useWalletConnectModal();

  // List of agents retrieved from the API response or an empty array if no data
  const agents = data?.agents || [];

  const onPress = () => {
    if (isConnected) {
      Alert.alert('Warning!', 'Are you sure you want to disconnect wallet?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            provider.disconnect();
          },
        },
      ]);
    } else {
      open();
    }
  };

  return (
    <PageContainer>
      <Header slug={'Communicate with ShakeyOS'} />
      <FlatList
        data={agents}
        renderItem={({index, item}) => {
          return loading ? <ActivityIndicator /> : <AgentCard agent={item} />;
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={() => <EmptyList />}
      />
      <CustomBtn
        text={address ? `Adress: ${address?.slice(0, 10)}` : 'Connect Wallet'}
        type={'PRIMARY'}
        onPress={onPress}
      />
    </PageContainer>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});
