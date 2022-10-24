import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




function Home({ navigation }) {
    return (
      <View style={styles.homeScreeBackground}>
        <Text style={styles.homeTitleText}>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#240530',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainText: {
      paddingTop: 50,
      flex: 1,
      color: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    homeScreeBackground: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#240530', 
    },
    homeTitleText:{ 
      color: '#fff',
    },
    ButtonText:{
      textColor: '#1BD760',
    }
    
  });