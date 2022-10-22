import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
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
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={DetailsScreen} />
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