import 'react-native-gesture-handler';
import * as React from 'react';
import styles from "../components/styles";
import {
    Button,
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView, 
    ScrollView,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_200Regular,
  Poppins_300Light,
} from "@expo-google-fonts/dev";
import {

    BarChart,

    ProgressChart,

  } from 'react-native-chart-kit';

import { useState, useEffect } from "react";
import axios from 'axios';
//import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: 'f2654301008b4cba927766c7b3efdbcb',
  redirectUri: "exp://172.20.10.3:19000",
})


function Track({route, navigation }) {
   //FONTS
    let [fontsLoaded] = useFonts({
      Poppins_500Medium,
      Poppins_200Regular,
      Poppins_300Light,
    });
  
   /*
  
    const [isShown, setIsShown] = useState("allTime");
    const [user, setUser] = useState([]);
    const [allTime, setAllTime] = useState([]);
    const [sixMonths, setSixMonths] = useState([]);
    const [threeMonths, setThreeMonths] = useState([]);
    const [ProfilePic, setProfilePic] = useState();
    const [pic, setPic] = useState();
    const [recents, setRecents] = useState([]);
    const { accessToken } = route.params;

  
  
    const [timeRange, setTimeRange] = useState('long_term');
    const updateTimeRange = (timeTerm) => {
        setTimeRange(timeTerm);
    }
  
    useEffect(() => {
      if (!accessToken){console.log("NO"); return;}
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken])
    
*/

const MyBarChart = () => {
    return (
      <>
        <Text style={styles.header}>Bar Chart</Text>
        <BarChart
          data={{
            labels: ['Danceability', 'Acousticness', 'Energy', 'Instrumentalness', 'Liveness', 'Valence', 'Speechiness'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43,80],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          yAxisLabel={'Rs'}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <Text>Track</Text>
            
        </ScrollView>
    </SafeAreaView>
);

}

export default Track;

const localStyles = StyleSheet.create({

   
    tracks: {
      fontSize: 20, alignItems: 'left', color: '#FBFBFB',fontFamily:'Poppins_500Medium',
    },
    trackSubtext: {
      fontSize: 20,
        alignItems: 'left',
        color: '#FBFBFB',
        fontFamily:'Poppins_300Light',
    },
  
    setterButtons: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      elevation: 3,
      borderRadius: 50 / 2,
      borderColor: '#FBFBFB',
      borderWidth: 1,
      marginHorizontal: 5,
    },
    setterButtonsActive: {
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      elevation: 3,
      borderRadius: 50 / 2,
      borderColor: '#2ebd59',
      borderWidth: 1,
      marginHorizontal: 5,
    },
    setterText: {
      color: '#FBFBFB',fontFamily:'Poppins_500Medium',
    },
    setterTextActive: {
      color: '#2ebd59',fontFamily:'Poppins_500Medium',
    },
  
  });