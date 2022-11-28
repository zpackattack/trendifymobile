import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, } from 'react-native';
import {useFonts } from 'expo-font';

function LogoHeader()
{
   //FONTS
   let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../fonts/Poppins-Bold.ttf'),
  });

    
    return (
        <View style={styles.container}>
        <Image style={styles.Logo} source={require("../images/logo.png")} />
        <Text style={{ fontFamily:'Poppins-Bold', fontSize: 65, marginBottom: 25, color: '#FBFBFB'}}>Trendify</Text>
        </View>
    );
}
export default LogoHeader;

const styles = StyleSheet.create({

   
    Logo: {
      marginBottom: 25,
      alignSelf:'center',
    },

});