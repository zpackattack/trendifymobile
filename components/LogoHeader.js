import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

function LogoHeader()
{
    let [fontsLoaded] = useFonts({
        Inter_900Black,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
        <View style={styles.container}>
        <Image style={styles.Logo} source={require("../images/logo.png")} />
        <Text style={{ fontFamily: 'Inter_900Black', fontSize: 65, marginBottom: 25, color: '#FFF'}}>Trendify</Text>
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