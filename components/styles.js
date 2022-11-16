import { CurrentRenderContext } from '@react-navigation/native';
import { useFonts, Open_Sans } from '@expo-google-fonts/inter';
import {   StyleSheet,} from 'react-native';
  

  

const styles = StyleSheet.create({
    //Register and Login styles
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
      flexDirection: 'row',
      alignItems: 'center',
    },

    LoginLogo: {
      marginBottom: 25,
    },

    Trendify: {
      marginBottom: 25,
      fontSize: 60,
      color:  '#FFF',
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

    iconLR: {
        paddingLeft: 10,
    },

    passEye:{
        paddingRight: 10,
    },

    //Spotify Login Styles
    spotifyLoginButton:{
      backgroundColor: '2ebd59'
    },

    //Home Screen Styles
    homeScreeBackground: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#240530', 
      },
      subText:{ 
        fontSize: 20,
        alignItems: 'left',
        color: '#fff',
        //flex: 2
      },
      ButtonText:{
        textColor: '#1BD760',
      },

      navigation:{
        flexDirection: 'row',
        padding: 30
      },

      searchlogo:{
        //bottom: 225,
        height: 45,
        width: 45,
        //left: 22
      },
      title:{
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40,
        //bottom: 225,
        //left: -10
      },

      profileIcon: {
        //width: 150,
        //height: 150,
        //border-radius: 50,
        //background: '#512DA8',
        //fontsize: 35,
        //color: '#fff',
        //text-align: center,
        //height: 150,
        //margin: 20px 0
      }
      

  });

  export default styles;