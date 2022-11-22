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
} from "@expo-google-fonts/dev";

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
  });



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
        setAllTime(data.body.items)
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

  const renderTracks = (track, index) => {
    
    return(
        <View style={styles.trackRow}>
        <Text style={styles.trackSubText}>{index+1}</Text>
        <Image
              source={{
                  url: track.album.images[0].url,
              }}
              //borderRadius style will help us make the Round Shape Image
              style={{ marginHorizontal: 10, width: 80, height: 80, borderRadius: 40 / 2 }}
            />
            <View style={styles.trackCol}>
                <Text style={localStyles.tracks}>{track.name}</Text>
                <Text style={localStyles.tracks}>{track.album.name}</Text>
                <Text style={localStyles.trackSubtext}>{track.artists[0].name}</Text>
            </View>
            <Text style={styles.trackSubText}>{formatDuration(track.duration_ms)}</Text>
        </View>
    );
  }

  const tracks = allTime.map((tracks, index) => {
    return renderTracks(tracks, index);
  });
  const tracksSixMos = sixMonths.map((tracks, index) => {
    return renderTracks(tracks, index);
  });
  const tracksThreeMos = threeMonths.map((tracks, index) => {
    return renderTracks(tracks, index);
  });

  function showTrack()
  {
    if(isShown === "allTime")
    {
        console.log(isShow);
        return tracks;
    }
    else if(isShown === "sixMonth")
    {
        console.log(isShow);
        return tracksSixMos;
    }
    else if(isShown === "threeMonth")
    {
        return tracksThreeMos;
    }
  }

  let isShow = 'allTime';
  function setShow(setter)
  {
    isShow = setter;
  }
  const highlightButton = (event, showTheRecents) => {
    setIsShown(showTheRecents);
    console.log(isShown);
  };

  return(
    <SafeAreaView style={styles.homeContainer}>
        <ScrollView>
            <View style={styles.headerRow}>
                <Text style={styles.TrendifyHome}>Top Tracks</Text>
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
              <Button
                    title="All Time"
                    onClick={(event) => {
                        highlightButton(event, 'allTime');
                        showTrack();
                        console.log(isShow);
                    }}    
                />
                <Button
                    title="6 Months"
                    onClick={() => {
                        setShow('sixMonth');

                        console.log(isShow);
                    }}  
                    
                />
                <Button
                    title="3 Months"
                    onClick={() => {
                        highlightButton('threeMonth');
                        showTrack();
                    }}  
                    
                />
            </View>
            
            

            <View style={{paddingVertical: '5%'}}>
            <Text style={styles.playlistTitle}>Tracks:</Text>
              {tracks}
            </View>


        </ScrollView>
    </SafeAreaView >
  ); 
  }

export default TopTracks;


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

});