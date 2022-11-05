import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';
import styles from '../components/styles';


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
