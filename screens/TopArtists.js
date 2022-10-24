import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';

function TopTracks({ navigation }) {
    return (
      <View style={styles.homeScreeBackground}>
        <Text style={styles.homeTitleText}>Details Screen</Text>
        <Button
          style = {styles.Buttons}
          title="Go to Details... again"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

export default TopTracks;

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