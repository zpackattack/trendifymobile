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
import { Formik } from 'formik';
import Home from './Home';



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

      <Formik 
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => 
        {
          console.log(values);
          navigation.navigate('MainApp');
        }}
      >
        {(props) => 
        (
          <View>
            <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              textAlign={'center'}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={props.handleChange('email')}
              value={props.values.email}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
              style={styles.TextInput}
              textAlign={'center'}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              secureTextEntry={true}
              />
              </View>

              <TouchableOpacity style={styles.loginBtn}>
                <Text 
                  style={styles.loginText} 
                  onPress={props.handleSubmit}
                  textAlign={'center'}>Login</Text>
              </TouchableOpacity>
          </View>
          
        )}
        
      </Formik>
  



      <Text style={styles.messageBox} type={messageType}>{message}</Text>

 
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
      width: 275,
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
      width: 275,
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