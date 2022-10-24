import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import navBar from './components/BottomNav.component';


function HomeScreen({ navigation }) {
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

function TopArtists({ navigation }) {
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
        component={HomeScreen}
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
        component={TopArtists}
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

/*
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { isLoading : true};
  }


  componentDidMount(){
    return fetch("https://cryptic-basin-76471.herokuapp.com/dreamforce")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading : false,
          message : responseJson.message
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style = {{flex: 1, padding: 20}}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )
    }

    return (
      <View style = {styles.container}>
        <Text style = {styles.mainText}>{this.state.message}</Text>
      </View>
    );
  }
}

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
});
*/