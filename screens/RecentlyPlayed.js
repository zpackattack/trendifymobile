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
import SpotifyWebApi from "spotify-web-api-node"
import { I } from '@expo/html-elements';
const spotifyApi = new SpotifyWebApi({
  clientId: 'f2654301008b4cba927766c7b3efdbcb',
  redirectUri: "exp://172.20.10.3:19000",
})


function RecentlyPlayed({ route, navigation }) {
  let useAltPFP = false;

  // Stores the result from the api calls
  const [user, setUser] = useState([]);
  const [numFollowing, setNumFollowing] = useState();
  const [numFollowers, setNumFollowers] = useState();
  const [playlist, setPlaylist] = useState([]);
  const [topTenArtists, setTopTenArtists] = useState([]);
  const [artProfilePic, setArtProfilePic] = useState();
  const [ProfilePic, setProfilePic] = useState();
  const [pic, setPic] = useState();
  const [recents, setRecents] = useState([]);
  const { accessToken } = route.params;
  //console.log("working?: "+ accessToken);

  const [timeRange, setTimeRange] = useState('long_term');
  const updateTimeRange = (timeTerm) => {
      setTimeRange(timeTerm);
  }


  useEffect(() => {
    if (!accessToken){console.log("NO"); return;}
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])

  // AUTHENTICATED USER
  useEffect(() => {
      spotifyApi.getMe()
      .then(function(data) {
          console.log('Some information about the authenticated user', data.body.id);
          setUser(data.body);
          setNumFollowers(data.body.followers.total);
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

  // TOP ARTISTS
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

    // PLAYLIST 

    useEffect(() => {
      if(!user.id) return
      spotifyApi.getUserPlaylists(user.id).then(
          function(data) {
              setPlaylist(data.body);
              //setPic(data.body.items.url);
              console.log('Playlist: ', data.body.next);
          },
          function(err) {
          console.log('Something went wrong.. here', err.message);
          }
      );
    }, [, user])

    // FOLLOWING 
    useEffect(() => {
      //if(!accessToken) return
      spotifyApi.getFollowedArtists().then(
      function(data) {
          // 'This user is following 1051 artists!'
          console.log('This user is following ', data.body.artists.total, ' artists!');
          setNumFollowing(data.body.artists.total);
      }, function(err) {
          console.log('Something went wrong! here?', err);
      });
    }, [])
    
    /*
    const artists = playlist.items.slice(0, 1).map((artist) => {
      
      return(
        <View>
          <Image
            source={{
                url: artist.url,
            }}
            //borderRadius style will help us make the Round Shape Image
            style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
          />
        </View>
      );
    });

    function CreatePlaylistRow()
    {
      for (let i = 0; i < playlist.items.length; i++) {
        let albumCover = playlist.items[0].images.url;
        return(
          <View>
            <Image
              source={{
                  url: albumCover,
              }}
              //borderRadius style will help us make the Round Shape Image
              style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
            />
          </View>
        );
      } 
    }*/
  
    /*const avatarImage = avatarCheck();

    function avatarCheck()
    {
      try{return user.images.url;}
      catch(e){return topTenArtists[0].images.url; };
    }
*/

    return (
      <SafeAreaView style={styles.container}>
            <ScrollView>
              
              <Text style={styles.TrendifyHome}>Profile</Text>
              <View style={styles.statsCenter}>
              <Image
                  source={{
                      url: ProfilePic,
                  }}
                  //borderRadius style will help us make the Round Shape Image
                  style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
              />
              </View>
             
              <Text style={styles.username}>{user.id}</Text>
              
              <View style={styles.statsCenter}>
                <View style={styles.statsRow}>
                  <View style={styles.statsCol1}>
                    <Text style={styles.statsProfile}>{numFollowing}</Text>
                    <Text style={styles.statsProfileWord}>Following</Text>
                  </View>
                  <View style={styles.statsCol2}>
                    <Text style={styles.statsProfile}>{numFollowers}</Text>
                    <Text style={styles.statsProfileWord}>Followers</Text>
                  </View>
                  <View style={styles.statsCol3}>
                    <Text style={styles.statsProfile}>{playlist.total}</Text>
                    <Text style={styles.statsProfileWord}>Playlists</Text>
                  </View>
                </View>
              </View>
              
              <View>
                <Text style={styles.playlistTitle}>Playlists:</Text>
                  <ScrollView horizontal={true}>
                    <Image
                      source={{
                          url: pic,
                      }}
                      //borderRadius style will help us make the Round Shape Image
                      style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
                    />
                  </ScrollView>
              </View>
              
            </ScrollView>
        </SafeAreaView >
    );
  }

export default RecentlyPlayed;

