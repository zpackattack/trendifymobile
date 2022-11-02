import 'react-native-gesture-handler';
import * as React from 'react';


import {   StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, } from 'react-native';
import LogoHeader from '../components/LogoHeader';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function Login({navigation})
{
    return (
        <View style={styles.container}>
        <LogoHeader />
    

        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            
            />
        </View>
    
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            
            />
        </View>
    
        
    
        <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.registerTxt} onPress={() => navigation.navigate('Register')}>Don't have an account? Sign Up</Text>
            
        </TouchableOpacity>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#240530",
        alignItems: "center",
        justifyContent: "center",
      },
   
    inputView: {
      backgroundColor: "#ffffff",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 25,
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
    },
   
    registerTxt: {
      height: 30,
      marginTop: 30,
      color:  '#1BD760',
    },

    ForgotPassword: {
        color:  '#1BD760',
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: "#af40e3",
    },
    
  });