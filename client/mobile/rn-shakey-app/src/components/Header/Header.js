import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
const Header = ({home, backEnable, headerText = 'hello'}) => {
  const navigation  = useNavigation();
  const { isOpen, open, close, provider, isConnected, address } = useWalletConnectModal();

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
                    provider.disconnect()
                  },
                },
              ]);
    } else {
      open()
    }
  }

  return (
    <View style={styles.container}>
      {backEnable ? (
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
      ) : null}

      <Text style={styles.headerText}>{headerText}</Text>
      {home ? (
        <TouchableOpacity
        onPress={onPress}
        style={styles.wallet_btn_container}
        >
            {
                address ?
                <>
                <View style={styles.greenDot} />
                <Text>{address?.slice(0,10)}...</Text>
                </>
                :
            <Text>Connect Wallet</Text>
            }
          <AntDesign name="wallet" size={30} color={address ?  "black":" grey"} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    borderRadius:8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    color: 'black',
    marginLeft: '2.5%',
    fontWeight: '500',
    fontSize: 16,
    textTransform: "capitalize"
  },
  greenDot: {
    width: 16, // Adjust size for the dot
    height: 16, // Adjust size for the dot
    borderRadius: 8, // Half of width/height for a perfect circle
    backgroundColor: "#32de84",
    marginRight: 8, // Spacing between the dot and the text
  },
  wallet_btn_container:{marginLeft:"auto", flexDirection:"row", alignItems:"center",
  backgroundColor: "white",
  width:"50%",
  justifyContent:"space-between",
  borderRadius:8,
  paddingHorizontal:"1.5%",
  borderWidth:1,
  borderColor:"grey",
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
}
});
