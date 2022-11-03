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
import { Formik } from 'formik';

function Register({navigation})
{
    return (
      <View style={styles.container}>
      <Image style={styles.Logo} source={require("../images/logotransparent.png")} />

      <Formik 
        initialValues={{name:'', email: '', password: '', confirmPassword: ''}}
        onSubmit={(values) => 
        {
          console.log(values);
            //navigation.navigate('App');
        }}
      >
        {(props) => 
        (
          <View>
            <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            textAlign={'center'}
            placeholder="Your Name"
            placeholderTextColor="#003f5c"
            onChangeText={props.handleChange('name')}
            value={props.values.name}
            />
      </View>

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
          secureTextEntry={true}
          onChangeText={props.handleChange('password')}
          value={props.values.password}
          />
      </View>

      <View style={styles.inputView}>
          <TextInput
          style={styles.TextInput}
          textAlign={'center'}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={props.handleChange('confirmPassword')}
          value={props.values.confirmPassword}
          />
      </View>

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
      resizeMode: 'cover',
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
      width: 275,
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
      width: 275,
    },
  });