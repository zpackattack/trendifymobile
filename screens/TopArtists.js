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

import { useState, useEffect } from "react";
import axios from 'axios';
//import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: 'f2654301008b4cba927766c7b3efdbcb',
  redirectUri: "exp://172.20.10.3:19000",
})

function TopArtists({route, navigation }) {
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

const AllTimeArtist = allTime.map((art) => {
    
  return(
      <View style={styles.trackRow}>
          <Image
              source={{
                  url: art.images[0].url,
              }}
              //borderRadius style will help us make the Round Shape Image
              style={{ marginHorizontal: 10, width: 80, height: 80, borderRadius: 80 / 2 }}
          />
          <View style={styles.artistCol}>
              <Text style={styles.artistText}>{art.name}</Text>
          </View>
      </View>
  );
})

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
                    title="Profile"
                    onPress={() => navigation.navigate('RecentlyPlayed', {accessToken:accessToken})}
                />
                <Button
                    title="Profile"
                    onPress={() => navigation.navigate('RecentlyPlayed', {accessToken:accessToken})}
                />
                <Button
                    title="Profile"
                    onPress={() => navigation.navigate('RecentlyPlayed', {accessToken:accessToken})}
                />
            </View>
            
            

            <View style={{paddingVertical: '5%'}}>
            <Text style={styles.playlistTitle}>Artists:</Text>
              {AllTimeArtist}
            </View>


        </ScrollView>
    </SafeAreaView >
  ); 
  }

export default TopArtists;
