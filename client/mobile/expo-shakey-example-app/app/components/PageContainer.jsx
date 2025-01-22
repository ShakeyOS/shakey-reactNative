import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const PageContainer = ({ children, style }) => {
  return (
    <SafeAreaView edges={["left", "right", "top"]} style={{ ...styles.container, ...style }}>
      {children}
    </SafeAreaView>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
});
