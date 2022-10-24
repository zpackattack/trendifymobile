import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './screens/Home';
import TopTracks from './screens/TopTracks';
import TopArtists from './screens/TopArtists';
import RecentlyPlayed from './screens/RecentlyPlayed';

import navBar from './components/BottomNav.component';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#1BD760',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: {backgroundColor: "black"}
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TopTracks"
        component={TopTracks}
        options={{
          header: () => null,
          tabBarLabel: 'Top Tracks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="album" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TopArtists"
        component={TopArtists}
        options={{
          header: () => null,
          tabBarLabel: 'Top Artists',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-music" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecentlyPlayed"
        component={RecentlyPlayed}
        options={{
          header: () => null,
          tabBarLabel: 'Recently Played',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;

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
