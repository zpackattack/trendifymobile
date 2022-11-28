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
import * as WebBrowser from 'expo-web-browser';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_200Regular,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import Data from "../components/data";
import { Chart as ChartJS } from 'chart.js/auto'
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

    
    
    const { accessToken } = route.params;
    const { song } = route.params;
    const { songID } = route.params;
    const {album} = route.params;
    const {artist} = route.params;
    const {trackUrl} = route.params;
    const {spotifyurl} = route.params;
    const {lastScreen} = route.params;
    const {popularity} = route.params;
    const [features, setFeatures] = useState([]);
    const [bars, setBars] = useState();
    const [beats, setBeats] = useState();
    const [segments, setSegments] = useState();
    const [sections, setSections] = useState();

  
  
  
    useEffect(() => {
      if (!accessToken){console.log("NO"); return;}
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

  // GET SONG INFORMATION

  useEffect(() => {
    spotifyApi.getAudioFeaturesForTrack(songID)
  .then(function(data) {
    setFeatures(data.body);
    //console.log(data.body);
  }, function(err) {
    done(err);
  });
  }, []);
  useEffect(() => {
    spotifyApi.getAudioAnalysisForTrack(songID)
  .then(function(data) {
    console.log(data.body.bars.length);
    setBars(data.body.bars.length);
    setBeats(data.body.beats.length);
    setSegments(data.body.segments.length);
    setSections(data.body.sections.length);
  }, function(err) {
    done(err);
  });
  }, []);
  //Open Spotify
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
};

const formatDuration = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
const parsePitchClass = note => {
  let key = note;

  switch (note) {
    case 0:
      key = 'C';
      break;
    case 1:
      key = 'D♭';
      break;
    case 2:
      key = 'D';
      break;
    case 3:
      key = 'E♭';
      break;
    case 4:
      key = 'E';
      break;
    case 5:
      key = 'F';
      break;
    case 6:
      key = 'G♭';
      break;
    case 7:
      key = 'G';
      break;
    case 8:
      key = 'A♭';
      break;
    case 9:
      key = 'A';
      break;
    case 10:
      key = 'B♭';
      break;
    case 11:
      key = 'B';
      break;
    default:
      return null;
  }

  return key;
};

  function RenderTrackView()
  {
    return(
      <View style={{flex:1,
          flexDirection: 'column', 
          alignContent: 'center', width: 210, marginLeft: 100,marginTop:5, backgroundColor: "#110118",
          borderRadius: 40 / 2, }}>
      <Pressable onPress = {() => _handlePressButtonAsync(spotifyurl)}>
        
          <Image
                source={{
                    url: trackUrl,
                }}
                //borderRadius style will help us make the Round Shape Image
                style={{ marginHorizontal: 5, width: 200, height: 200, borderRadius: 50 / 2 }}
              />
          <View style={{marginLeft:10}}>
          <Text style={localStyles.tracks}>{song}</Text>
          <Text style={localStyles.tracks}>{album}</Text>
          <Text style={localStyles.trackSubtext}>{artist}</Text>
        </View>
      </Pressable>
      </View>
  ); 
  }

  function RenderFeatures() {
    return(
      
      <View style={[styles.statsCenter, {marginHorizontal:110}]}>
        
        <View style={styles.statsRow}>
          <View style={styles.trackPageCol}>
            <Text style={Math.round(features.danceability*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.danceability*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.danceability*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.danceability*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile
            }>{Math.round(features.danceability*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Danceability</Text>

            <Text style={Math.round(features.liveness*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.liveness*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.liveness*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.liveness*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile}>{Math.round(features.liveness*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Liveness</Text>
            
          </View>
          <View style={styles.trackPageCol}>
            <Text style={Math.round(features.acousticness*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.acousticness*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.acousticness*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.acousticness*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile}>{Math.round(features.acousticness*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Acousticness</Text>

            <Text style={Math.round(features.instrumentalness*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.instrumentalness*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.instrumentalness*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.instrumentalness*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile}>{Math.round(features.instrumentalness*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Instrumentalness</Text>
          </View>
          <View style={styles.trackPageCol}>
            <Text style={Math.round(features.energy*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.energy*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.energy*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.energy*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile}>{Math.round(features.energy*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Energy</Text>

            <Text style={Math.round(features.valence*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.valence*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.valence*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.valence*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile}>{Math.round(features.valence*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Valence</Text>
          </View>
          <View style={styles.trackPageCol}>
          <Text style={Math.round(features.speechiness*100) <= 25 ? localStyles.statsProfile: 
            Math.round(features.speechiness*100) <=50 ? localStyles.statsProfile2:
            Math.round(features.speechiness*100) <=75 ? localStyles.statsProfile3:
            Math.round(features.speechiness*100) <=100 ? localStyles.statsProfile4:
            localStyles.statsProfile}>{Math.round(features.speechiness*100)}%</Text>
            <Text style={localStyles.statsProfileWord}>Speechiness</Text>
          </View>
        </View>
       
      </View>
       
    );
  }

  function RenderInfo() {
    return(
      
      <View style={[styles.statsCenter, {marginHorizontal:80, }]}>
        
        <View style={[styles.statsRow]}>
          <View style={styles.trackPageCol2}>
            <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
              <Text style={[styles.statsProfile]}>{formatDuration(features.duration_ms)}</Text>
              <Text style={localStyles.statsProfileWord1}>Duration</Text>
            </View>

            <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
              <Text style={[styles.statsProfile]}>{popularity}</Text>
              <Text style={localStyles.statsProfileWord1}>Popularity</Text>
            </View>
          </View>
          <View style={styles.trackPageCol2}>
          <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
            <Text style={[styles.statsProfile]}>{parsePitchClass(features.key)}</Text>
            <Text style={localStyles.statsProfileWord1}>Key</Text>
          </View>

          <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
            <Text style={[styles.statsProfile]}>{bars}</Text>
            <Text style={localStyles.statsProfileWord1}>Bars</Text>
            </View>
          </View>
          <View style={styles.trackPageCol2}>
          <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
            <Text style={[styles.statsProfile]}>{features.mode === 1 ? 'Major' : 'Minor'}</Text>
            <Text style={localStyles.statsProfileWord1}>Modality</Text>
            </View>
            <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
            <Text style={[styles.statsProfile]}>{beats}</Text>
            <Text style={localStyles.statsProfileWord1}>Beats</Text>
            </View>
          </View>
          <View style={styles.trackPageCol2}>
          <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
          <Text style={[styles.statsProfile]}>{features.time_signature}</Text>
            <Text style={localStyles.statsProfileWord1}>Time Signature</Text>
            </View>
            <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
            <Text style={[styles.statsProfile]}>{sections}</Text>
            <Text style={localStyles.statsProfileWord1}>Sections</Text>
            </View>
          </View>
          <View style={styles.trackPageCol2}>
          <View style={{borderColor: '#FBFBFB', borderWidth: 1,height:125, justifyContent:'center'}}>
            <Text style={styles.statsProfile}>{Math.round(features.tempo)}</Text>
            <Text style={localStyles.statsProfileWord1}>Tempo</Text>
            </View>

            <View style={{borderColor: '#FBFBFB', borderWidth: 1, height:125, justifyContent:'center'}}>
            <Text style={[styles.statsProfile, ]}>{segments}</Text>
            <Text style={localStyles.statsProfileWord1}>Segments</Text>
            </View>
          </View>
        </View>
       
      </View>
       
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false}>
        <View style={{alignContent: 'flex-start', width: 100,}}>
          <Pressable 
          style={localStyles.setterButtons}
                    onPress={() => {
                      navigation.navigate(lastScreen);
                      }}>
            <Text style ={localStyles.setterText}>Back</Text>
          </Pressable>
        </View>

        <RenderTrackView/>
      
        <Text style={[styles.playlistTitle, {marginTop:25}]}>Features</Text>
        <ScrollView horizontal={true}>
         <RenderFeatures/>
        </ScrollView>

        <Text style={[styles.playlistTitle, {marginTop:0}]}>Track Information</Text>
        <ScrollView horizontal={true}>
         <RenderInfo/>
        </ScrollView>
            
        <Data/>
      </ScrollView>
    </SafeAreaView>
);

}

export default Track;

const localStyles = StyleSheet.create({
  statsProfile: {
    fontSize: 35,
    color:  '#7821DE',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statsProfile2: {
    fontSize: 35,
    color:  '#a121de',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statsProfile3: {
    fontSize: 35,
    color:  '#AF21DE',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statsProfile4: {
    fontSize: 35,
    color:  '#DE21DE',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
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
      paddingHorizontal: 5,
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
    statsProfileWord: {
      fontSize: 22,
      color:  '#FBFBFB',
      textAlign: 'center',
      fontFamily:'Poppins_300Light',
      marginBottom: 25,
    },
    statsProfileWord1: {
      fontSize: 22,
      color:  '#FBFBFB',
      textAlign: 'center',
      fontFamily:'Poppins_300Light',
    },
  
  });