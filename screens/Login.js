import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TextInput,
    Button,
    TouchableOpacity, } from 'react-native';
import LogoHeader from '../components/LogoHeader';
import axios from 'axios'; 
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



function Login({navigation})
{
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleLogin = (credentials) => 
  {
    const url = 'https://trendify-project.herokuapp.com/api/login';

    axios
      .post(url, credentials)
      .then((response) => 
      {
        const result = response.data;
        const {message, status, data} = result;

        if (status !== 'SUCESS')
        {
          handleMessage(message, status);
        }
        else
        {
          navigation.navigate('app', {...data[0]});
        }
      })
      .catch(error => {
      console.log(error.JSON());
      handleMessage("An error occurred. Check your network");
    })
  }

  const handleMessage = (message, type = 'FAILED') =>
  {
    setMessage(message);
    setMessageType(type);
  }

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

      <Text style={styles.messageBox} type={messageType}>{message}</Text>

      <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText} onPress={handleLogin}>Login</Text>
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
    messageBox:
    {
      textAlign: 'center',
      fontSize: 13,
      color: 'red',
    },
  });