import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './screens/Login';
import Register from './screens/Register';
import SpotifyLogin from './screens/SpotifyLogin';
import Home from './screens/Home';
import TopTracks from './screens/TopTracks';
import TopArtists from './screens/TopArtists';
import RecentlyPlayed from './screens/RecentlyPlayed';



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
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} 
      options={{
        header: () => null,
      }}
      />
      <Stack.Screen name="Register" component={Register} 
      options={{
        header: () => null,
      }}/>
      <Stack.Screen name="SpotifyLogin" component={SpotifyLogin} 
      options={{
        header: () => null,
      }}
      />
      <Stack.Screen name="MainApp" component={MyTabs}
      options={{
        header: () => null,
      }}/>
    </Stack.Navigator>
  );
}
//for now change MyStack to MyTabs to see the other pages
function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;

