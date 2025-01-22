import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PageContainer from '../../components/PageContainer';
import AgentCard from '../../components/AgentCard/AgentCard';
import Header from '../../components/Header/Header';
import useFetch from '../../hooks/useFetch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Displays a message and an icon when there are no agents found
const EmptyList = ({message = 'No agents found'}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search-off" size={48} color="gray" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
const HomeScreen = () => {
  // Custom hook to fetch data from the '/agents' endpoint
  // Extracting relevant values: data, loading, error, refreshing status, and onRefresh function
  const {data, loading, error, refreshing, onRefresh} = useFetch('/agents');

  // List of agents retrieved from the API response or an empty array if no data
  const agents = data?.agents || [];

  // Show a loading indicator while data is being fetched
  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <PageContainer>
      <Header headerText="Home" home={true}/>
      <FlatList
        data={agents}
        renderItem={({index, item}) => {
          return <AgentCard agent={item} />;
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={() => <EmptyList />}
      />
    </PageContainer>
  );
};

export default HomeScreen;

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
