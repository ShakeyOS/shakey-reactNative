import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PageContainer = ({children, style}) => {
  return (
    <SafeAreaView edges={['right', 'left']} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
