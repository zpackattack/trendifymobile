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
    SafeAreaView, 
    ScrollView,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_200Regular,
  Poppins_300Light,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as WebBrowser from 'expo-web-browser';
import Data from "../components/data";

import { useState, useEffect } from "react";
import axios from 'axios';
//import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: 'f2654301008b4cba927766c7b3efdbcb',
  redirectUri: "exp://172.20.10.3:19000",
})

function TopTracks({route, navigation }) {
  //FONTS
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_200Regular,
    Poppins_300Light,
    Poppins_700Bold,
  });

        //Open Spotify
        const _handlePressButtonAsync = async (url) => {
          await WebBrowser.openBrowserAsync(url);
      };


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
  let useAltPFP = false;

  useEffect(() => {
    spotifyApi.getMe()
    .then(function(data) {
        console.log('Some information about the authenticated user', data.body.id);
        setUser(data.body);
        console.log(data.body.images.length);
        if(data.body.images.length != 0){
            setProfilePic(data.body.images[0].url);
        }
        else{
            useAltPFP = true;
            console.log(useAltPFP);
        }
        
    }, function(err) {
        console.log('Something went wrong!', err);
    });
}, [accessToken])
useEffect(() => {
  //if(!accessToken) return
  
  spotifyApi.getMyTopArtists({limit : 10 , time_range: timeRange})
  .then(function(data) {
      
      if(useAltPFP)
      {
          setProfilePic(data.body.items[0].images[0].url);
      }
      
      //setTopArtistPic(data.body.items[0].images[0].url)
      //console.log('TopArt1'+ data.body.items);

  });
}, [timeRange])

  useEffect(() => {
    //if(!accessToken) return
    spotifyApi.getMyTopTracks({limit : 50 , time_range: 'long_term'})
    .then(function(data) {
        setAllTime(data.body.items);
        showTrack("allTime");
        //console.log(data.body.items[0].name)
    }, function(err) {
        console.log('Something went wrong! ', err);
    });

    spotifyApi.getMyTopTracks({limit : 50 , time_range: 'medium_term'})
    .then(function(data) {
      setSixMonths(data.body.items)
        //console.log(data.body.items[0].name)
    }, function(err) {
        console.log('Something went wrong! ', err);
    });

    spotifyApi.getMyTopTracks({limit : 50 , time_range: 'short_term'})
    .then(function(data) {
      setThreeMonths(data.body.items)
        //console.log(data.body.items[0].name)
    }, function(err) {
        console.log('Something went wrong! ', err);
    });
  }, [timeRange]) 

  const formatDuration = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  /*<Pressable onPress={() => navigation.navigate('Track', {accessToken:accessToken,song:track.name, artist:track.artists[0].name, album:track.album.name, songID:track.id})}>*/

  const renderTracks = (track, index) => {
    
    return(
      
      <Pressable onPress={() => _handlePressButtonAsync(track.external_urls.spotify)}>
        <View style={styles.trackRow}>
        
        <Image
              source={{
                  url: track.album.images[0].url,
              }}
              //borderRadius style will help us make the Round Shape Image
              style={{ marginHorizontal: 10, width: 60, height: 60, borderRadius: 30 / 2 }}
            />
            <Text style={styles.numText}>{index+1}</Text>
            <View style={[styles.trackCol, {paddingRight:20}]}>
                <Text numberOfLines={1} style={localStyles.tracks}>{track.name}</Text>
                {/*<Text numberOfLines={1} style={localStyles.tracks}>{track.album.name}</Text>*/}
                <Text style={localStyles.trackSubtext}>{track.artists[0].name}</Text>
            </View>
            <Text style={localStyles.timeText}>{formatDuration(track.duration_ms)}</Text>
        </View>
        </Pressable>
    );
  }

  const allTimeTracks = allTime.map((tracks, index) => {
    return renderTracks(tracks, index);
  });
  const tracksSixMos = sixMonths.map((tracks, index) => {
    return renderTracks(tracks, index);
  });
  const tracksThreeMos = threeMonths.map((tracks, index) => {
    return renderTracks(tracks, index);
  });


  const highlightButton = (event, showTheRecents) => {
    setIsShown(showTheRecents);
  };

  return(
    <SafeAreaView style={styles.homeContainer}>
        <ScrollView>
        <View style={styles.headerRow}>
                <View style={{alignItems: 'flex-end', left: 40}}>
                <Image
                            style={{width: 180, height: 75, resizeMode: 'contain', marginTop:5, marginBottom:10,}}
                            source={require("../images/TrendifyWord.png")}
                    />
                    </View>
                    {/*
                    <Image
                            style={{width: 175, height: 87, resizeMode: 'stretch'}}
                            source={require("../images/logotransparent.png")}
                    />
                    */}
              
                    <View style={{alignItems: 'flex-end', left: 55}}>
                        <Pressable onPress={() => navigation.navigate('RecentlyPlayed', {accessToken:accessToken})}>
                            <Image
                                source={{
                                    url: ProfilePic,
                                }}
                                
                                //borderRadius style will help us make the Round Shape Image
                                style={{alignSelf: 'flex-end', width: 75, height: 75, borderRadius: 75 / 2, }}
                            />
                        </Pressable>
                    </View>
                </View>

            <View style={styles.headerRow}>
              <Pressable
                    //onPress={highlightButton('allTime')}  
                    style={isShown === 'allTime' ? localStyles.setterButtonsActive: localStyles.setterButtons}
                    onPress={(event) => {
                      highlightButton(event, 'allTime');
                      }}
                >
                  <Text style={isShown === 'allTime' ? localStyles.setterTextActive:localStyles.setterText}>All Time</Text>
                </Pressable>
                <Pressable
                    style={isShown === 'sixMonth' ? localStyles.setterButtonsActive: localStyles.setterButtons}
                    onPress={(event) => {
                      highlightButton(event, 'sixMonth');
                      }}  
                >
                  <Text style={isShown === 'sixMonth' ? localStyles.setterTextActive:localStyles.setterText}>6 Months</Text>
                </Pressable>
                <Pressable
                    style={isShown === 'threeMonth' ? localStyles.setterButtonsActive: localStyles.setterButtons}
                    onPress={(event) => {
                      highlightButton(event, 'threeMonth');
                      }}   
                >
                  <Text style={isShown === 'threeMonth' ? localStyles.setterTextActive:localStyles.setterText}>3 Months</Text>
                </Pressable>
            </View>
            
            

            <View style={{paddingVertical: '5%'}}>
            <Text style={styles.playlistTitle}>Tracks</Text>
            {isShown === 'allTime' ? <View>{allTimeTracks}</View>: <>
            {isShown === 'sixMonth' ? <View>{tracksSixMos}</View>: <>
            {isShown === 'threeMonth'? <View>{tracksThreeMos}</View>:
            <Text>Loading...</Text>
            }</>
            }</>
            }
              
            </View>
            <Data/>

        </ScrollView>
    </SafeAreaView >
  ); 
  }

export default TopTracks;


const localStyles = StyleSheet.create({
  Trendify: {
    fontSize: 40, color: '#FBFBFB', 
    textAlign: 'center',marginBottom: 30, marginTop: 10,

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
  timeText: {
    fontSize: 20,
    fontFamily:'Poppins_300Light',
    color: '#FBFBFB',
    marginVertical: '5%',
    marginRight: '2%',
    right:1,
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

  titles: {
    fontSize: 25,
    color:  '#FBFBFB',
    fontFamily:'Poppins_500Medium',
    textAlign: 'left',
    paddingLeft: '3%',
    height: 40,
},

});