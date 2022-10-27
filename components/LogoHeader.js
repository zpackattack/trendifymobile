import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, } from 'react-native';


function LogoHeader()
{
    return (
        <View style={styles.container}>
        <Image style={styles.Logo} source={require("../images/logo.png")} />
        <Text style={styles.Trendify}>Trendify</Text>
        </View>
    );
}
export default LogoHeader;

const styles = StyleSheet.create({

   
    Logo: {
      marginBottom: 25,
    },

    Trendify: {
        marginBottom: 25,
        fontSize: 60,
        color:  '#FFF',
    },
});