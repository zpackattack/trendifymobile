import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Pressable } from 'react-native';
import LogoHeader from '../components/LogoHeader';
import axios from 'axios'; 
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordAvalibility';
import styles from '../components/styles';




function Login({navigation})
{


  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [password, setPassword] = useState('');
  

  const handleLogin = (credentials) => 
  {
    handleMessage(null);
    const url = 'https://trendify-project.herokuapp.com/api/login';

    axios.post(url, credentials).then((response) => 
      {
        console.log("talk");
        const result = response.data;
        const {message, status, data} = result;

        if (response.status == 200)
        {
          navigation.navigate('SpotifyLogin');
          
        }
        else
        {
          handleMessage(message, status);
        }
      }).catch((error) => {
        console.log(error);
        handleMessage("An error occurred. Check your network");
    });
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
        initialValues={{login: '', password: ''}}
        onSubmit={(values) => 
        {
          if(values.login == '' || values.password == '')
          {
            handleMessage("Please fill all fields");
          }
          else{
            console.log(values);
            handleMessage("");
            handleLogin(values);
            //navigation.navigate('SpotifyLogin');
            
          }
        }}
      >
        {(props) => 
        (
          <View>
            <View style={styles.inputView}>
              <MaterialCommunityIcons style={styles.iconLR} name={'email'} size={22} color='#232323' />
              <TextInput
              style={styles.TextInput}
              textAlign={'left'}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={props.handleChange('login')}
              value={props.values.login}
              />
            </View>
            <View style={styles.inputView}>
              <MaterialCommunityIcons style={styles.iconLR} name={'lock'} size={22} color='#232323' />
              <TextInput
              style={styles.TextInput}
              textAlign={'left'}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={props.handleChange('password')}
              value={props.values.password}
              secureTextEntry={passwordVisibility}
              />
              <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons style={styles.passEye} name={rightIcon} size={22} color='#232323' />
              </Pressable>
            </View>

              <Text style={styles.messageBox} type={messageType}>{message}</Text>

              <TouchableOpacity style={styles.loginBtn}>
                <Text 
                  style={styles.loginText} 
                  onPress={props.handleSubmit}
                  textAlign={'center'}>Login</Text>
              </TouchableOpacity>
          </View>
          
        )}
        
      </Formik>
 
      <TouchableOpacity>
          <Text style={styles.registerTxt} onPress={() => navigation.navigate('Register')}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      </View>
  );
}

export default Login;
