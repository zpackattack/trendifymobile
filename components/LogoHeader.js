import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, } from 'react-native';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_200Regular,
  Poppins_300Light,
} from "@expo-google-fonts/dev";

function LogoHeader()
{
   //FONTS
   let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_200Regular,
    Poppins_300Light,
  });

    
    return (
        <View style={styles.container}>
        <Image style={styles.Logo} source={require("../images/logo.png")} />
        <Text style={{ fontFamily:'Poppins_500Medium', fontSize: 65, marginBottom: 25, color: '#FBFBFB'}}>Trendify</Text>
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