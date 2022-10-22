import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";


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
