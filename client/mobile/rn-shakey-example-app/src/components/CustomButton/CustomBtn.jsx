import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';

const CustomBtn = ({
  onPress,
  text,
  disabled,
  type,
  bgColor,
  textColor,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          textColor ? {color: textColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
  },
  container_PRIMARY: {
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 5,
  },
  container_SECONDARY: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  container_TERTIARY: {},
  text_PRIMARY: {
    color: colors.white,
  },

  text_SECONDARY: {
    color: colors.primary,
  },

  text_TERTIARY: {
    color: colors.white,
    fontWeight: '400',
  },
});
