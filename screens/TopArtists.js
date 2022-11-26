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
import Data from "../components/data";

import { useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios';
//import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: 'f2654301008b4cba927766c7b3efdbcb',
  redirectUri: "exp://172.20.10.3:19000",
})

function TopArtists({route, navigation }) {
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

      //Open Spotify
      const _handlePressButtonAsync = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    };

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
  
  spotifyApi.getMyTopArtists({limit : 50 , time_range: 'long_term'})
  .then(function(data) {
    setAllTime(data.body.items);
      if(useAltPFP)
      {
          setProfilePic(data.body.items[0].images[0].url);
      }
      
      //setTopArtistPic(data.body.items[0].images[0].url)
      //console.log('TopArt1'+ data.body.items);
  spotifyApi.getMyTopArtists({limit : 50 , time_range: 'medium_term'})
    .then(function(data) {
      setSixMonths(data.body.items)
        //console.log(data.body.items[0].name)
    }, function(err) {
        console.log('Something went wrong! ', err);
    });
  spotifyApi.getMyTopArtists({limit : 50 , time_range: 'short_term'})
  .then(function(data) {
    setThreeMonths(data.body.items)
      //console.log(data.body.items[0].name)
  }, function(err) {
      console.log('Something went wrong! ', err);
  });

  });
}, [timeRange])

const renderArtists = (art, index) => {
    
    return(
      <Pressable onPress = {() => _handlePressButtonAsync(art.external_urls.spotify)}>
        <View style={styles.trackRow}>
        
      <Image
          source={{
              url: art.images[0].url,
          }}
          //borderRadius style will help us make the Round Shape Image
          style={{ marginHorizontal: 10, width: 60, height: 60, borderRadius: 60 / 2 }}
      />
      <View style={styles.artistCol}>
          <Text style={localStyles.tracks}>{art.name}</Text>
      </View>
        <Text style={localStyles.numText}>{index+1}</Text>
      </View>
      </Pressable>
        
    );
  }

  const AllTimeArtist = allTime.map((tracks, index) => {
    return renderArtists(tracks, index);
  });
  const ArtistsSixMos = sixMonths.map((tracks, index) => {
    return renderArtists(tracks, index);
  });
  const ArtistsThreeMos = threeMonths.map((tracks, index) => {
    return renderArtists(tracks, index);
  });

  const highlightButton = (event, showTheRecents) => {
    setIsShown(showTheRecents);
  };

  return(
    <SafeAreaView style={styles.homeContainer}>
        <ScrollView>
            <View style={styles.headerRow}>
                <Text style={styles.TrendifyHome}>Top Artists</Text>
                <View style={{alignItems: 'flex-end'}}>
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
            <Text style={styles.playlistTitle}>Artists</Text>
            {isShown === 'allTime' ? <View>{AllTimeArtist}</View>: <>
            {isShown === 'sixMonth' ? <View>{ArtistsSixMos}</View>: <>
            {isShown === 'threeMonth'? <View>{ArtistsThreeMos}</View>:
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

export default TopArtists;
const localStyles = StyleSheet.create({

   
    tracks: {
      fontSize: 20, alignItems: 'center', color: '#FBFBFB',fontFamily:'Poppins_500Medium',
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
    numText:
    {
      fontSize: 20,
      //alignItems: 'left',
      color: '#FBFBFB',
      fontWeight: '500',
      marginVertical: '5%',
      marginHorizontal: '5%',
      left:1,
    }
  
  });