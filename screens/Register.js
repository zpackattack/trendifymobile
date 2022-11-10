import 'react-native-gesture-handler';
import * as React from 'react';
import {   StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
  Pressable } from 'react-native';
import axios from 'axios'; 
import LogoHeader from '../components/LogoHeader';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordAvalibility';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import styles from '../components/styles';

function Register({navigation})
{
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
    
  const [password, setPassword] = useState('');

  const handleSignup = (credentials) => 
  {
    const url = 'https://trendify-project.herokuapp.com/api/register';

    axios.post(url, credentials).then((response) => 
      {
        console.log("talk");
        const result = response.data;
        const {message, status, data} = result;
        console.log(response.data);
        if (response.data == 200)
        {
          navigation.navigate('MainApp');
          
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
      <Image style={styles.Logo} source={require("../images/logotransparent.png")} />

      <Formik 
        initialValues={{name:'', email: '', password: '', confirmPassword: ''}}
        onSubmit={(values) => 
        {
          values = {...values};
          if(values.name == '' || values.email == '' || values.password == '' || values.confirmPassword == '')
          {
            handleMessage("Please fill all fields");
          }
          else if (values.password !== values.confirmPassword)
          {
            handleMessage('Passwords do not match');
          }
          else{
            console.log(values);
            newValues = {login: values.email, password: values.password, name: values.name};
            console.log(newValues);
            handleMessage("");
            handleSignup(newValues);
            //navigation.navigate('MainApp');
            
          }
        }}
      >
        {(props) => 
        (
          <View>
            
            <View style={styles.inputView}>
              <AntDesign style={styles.iconLR} name={'user'} size={22} color='#232323' /> 
              <TextInput
              style={styles.TextInput}
              textAlign={'left'}
              placeholder="Your Name"
              placeholderTextColor="#003f5c"
              onChangeText={props.handleChange('name')}
              value={props.values.name}
              />
            </View>

      <View style={styles.inputView}>
        <MaterialCommunityIcons style={styles.iconLR} name={'email'} size={22} color='#232323' />
          <TextInput
          style={styles.TextInput}
          textAlign={'left'}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={props.handleChange('email')}
          value={props.values.email}
          />
      </View>
  
      <View style={styles.inputView}>
        <MaterialCommunityIcons style={styles.iconLR} name={'lock'} size={22} color='#232323' />
          <TextInput
          style={styles.TextInput}
          textAlign={'left'}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={passwordVisibility}
          onChangeText={props.handleChange('password')}
          value={props.values.password}
          />
          <Pressable onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons style={styles.passEye} name={rightIcon} size={22} color='#232323' />
          </Pressable>
      </View>

      <View style={styles.inputView}>
        <MaterialCommunityIcons style={styles.iconLR} name={'lock'} size={22} color='#232323' />
          <TextInput
          style={styles.TextInput}
          textAlign={'left'}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={passwordVisibility}
          onChangeText={props.handleChange('confirmPassword')}
          value={props.values.confirmPassword}
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
              textAlign={'center'}>Register</Text>
          </TouchableOpacity>
        </View>
          
        )}
        
      </Formik>
  

      <TouchableOpacity>
          <Text style={styles.LoginTxt} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
      </TouchableOpacity>
      </View>
    );
}

export default Register;
