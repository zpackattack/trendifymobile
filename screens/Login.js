import React, {useRef, useCallback, useState} from 'react';
import 'react-native-gesture-handler';
import {   StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    Pressable } from 'react-native';
import LogoHeader from '../components/LogoHeader';
import axios from 'axios'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordAvalibility';
import styles from '../components/styles';
import { useFonts } from 'expo-font';
import Recaptcha from 'react-native-recaptcha-that-works';



function Login({navigation})
{
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('../fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../fonts/Poppins-Medium.ttf'),
  });

  const size = 'invisible';
  const [key, setKey] = useState('<none>');

  const $recaptcha = useRef();

  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);


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
          handleOpenPress();
          
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
            //handleOpenPress();
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
                  style={localStyles.loginText} 
                  onPress={props.handleSubmit}
                  textAlign={'center'}>Login</Text>
              </TouchableOpacity>
          </View>
          
        )}
        
      </Formik>
 
      <TouchableOpacity>
          <Text style={localStyles.registerTxt} onPress={() => navigation.navigate('Register')}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <Recaptcha
        ref={$recaptcha}
        lang="pt"
        headerComponent={
          <Button title="Close modal" onPress={handleClosePress} />
        }
        footerComponent={<Text>Footer here</Text>}
        siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        baseUrl="http://127.0.0.1"
        size={size}
        theme="dark"
        onLoad={() => Alert.alert('onLoad event')}
        onClose={() => Alert.alert('onClose event')}
        onError={(err) => {
          Alert.alert('onError event');
          console.warn(err);
        }}
        onExpire={() => Alert.alert('onExpire event')}
        onVerify={(token) => {
          Alert.alert('onVerify event');
          setKey(token);
        }}
        enterprise={false}
        hideBadge={false}
      />
      </View>
      
  );
}

export default Login;

const localStyles = StyleSheet.create({

  loginText: {
    fontFamily:'Poppins-Medium',
    fontSize: 20,
  },
  registerTxt: {
    height: 30,
      marginTop: 30,
      color:  '#1BD760',
      fontFamily:'Poppins-Light',
  },
});