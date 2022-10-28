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

function Register({navigation})
{
    return (
      <View style={styles.container}>
      <Image style={styles.Logo} source={require("../images/logotransparent.png")} />
  
      <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Your Name"
            placeholderTextColor="#003f5c"
            
            />
      </View>

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

      <View style={styles.inputView}>
          <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          
          />
      </View>
  
  
      <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.Register}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity>
          <Text style={styles.LoginTxt} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
      </TouchableOpacity>
      </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#240530",
      alignItems: "center",
      justifyContent: "center",
    },
   
    Logo: {
      marginTop: 25,
      marginBottom: 40,
      width: 345,
      height: 100,
      resizeMode: 'fit',
    },
   
    inputView: {
      backgroundColor: "#ffffff",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,

    },
   
    LoginTxt: {
      height: 30,
      marginTop: 30,
      color:  '#1BD760',
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#af40e3",
    },
  });