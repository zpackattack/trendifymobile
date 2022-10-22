import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', color: '#000'}}>Home Screen</Text>
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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