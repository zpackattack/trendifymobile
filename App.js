import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import Login from './screens/Login';
import Register from './screens/Register';
import SpotifyLogin from './screens/SpotifyLogin';
//import Home from './screens/Home';
import TopTracks from './screens/TopTracks';
import TopArtists from './screens/TopArtists';
import RecentlyPlayed from './screens/RecentlyPlayed';
import HomeWNav from './screens/HomeWNav';
import Track from './screens/Track';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_200Regular,
  Poppins_300Light,
} from "@expo-google-fonts/dev";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
//import {Provider} from 'react-redux';
//import {store} from './redux';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs({route}) {
  const { accessToken } = route.params;
  const song = [];
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
        component={HomeWNav}
        initialParams={{accessToken: accessToken}}
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
        initialParams={{accessToken: accessToken}}
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
        initialParams={{accessToken: accessToken}}
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
        initialParams={{accessToken: accessToken}}
        options={{
          header: () => null,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-circle-outline" color={color} size={size} />
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
<Stack.Screen name="Track" component={Track}
      options={{
        header: () => null,
      }}/>
      

    </Stack.Navigator>
  );
}
//for now change MyStack to MyTabs to see the other pages
function App() {
  console.disableYellowBox = true;
     //FONTS
     let [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_200Regular,
      Poppins_300Light,
    });
  
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

export default App;

