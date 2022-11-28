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
      Poppins_700Bold,
    } from "@expo-google-fonts/poppins";

function LogoHeader()
{
   //FONTS
   let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_200Regular,
    Poppins_300Light,
    Poppins_700Bold,
  });

    
    return (
        <View style={styles.container}>
        <Image style={styles.Logo} source={require("../images/logo.png")} />
        <Image
                style={{width: 270, height: 100, resizeMode: 'contain'}}
                source={require("../images/TrendifyWord.png")}
        />
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