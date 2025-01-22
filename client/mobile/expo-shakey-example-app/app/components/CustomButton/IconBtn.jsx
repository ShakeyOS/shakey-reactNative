import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../constants/colors';

const IconBtn = ({
  onPress,
  IconPack,
  iconName,
  text,
  style,
  iconProps,
  unread,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {text && (
        <Text
          style={{
            fontSize: 16,
            color: colors.primary,
            marginHorizontal: 8,
            fontWeight: '500',
          }}>
          {text}
        </Text>
      )}
      {IconPack && (
        <IconPack
          name={iconName}
          size={24}
          color={colors.primary}
          {...iconProps}
        />
      )}
      {unread && (
        <View
          style={{
            height: 12,
            width: 12,
            backgroundColor: colors.red,
            borderRadius: 6,
            position: 'absolute',
            top: 0,
            left: -5,
          }}
        />
      )}
    </TouchableOpacity>
  );
};
export default IconBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shadow,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
