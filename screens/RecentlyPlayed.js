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
    ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';

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
  const [numPlaylists, setNumPlaylists] = useState();
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
              const j = JSON.stringify(data.body);
              setPlaylist(data.body.items);
              //console.log('Playlist: '+ data.body.items[0].images[0].url);
              //setPlaylistCover(data.body.items[0].images[0].url);
              setNumPlaylists(data.body.total);
              
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

    useEffect(() => {
      if(!accessToken) return
      spotifyApi.getMyRecentlyPlayedTracks({
          limit : 50
      }).then(function(data) {
          // Output items
          setRecents(data.body.items);
          console.log(data.body.items[0].track.artists[0].name);
      }, function(err) {
          console.log('Something went wrong!', err);
      }
  );}, [accessToken])

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  
    const PlaylistCollection = playlist.map((play) => {
        
      return(
        <Pressable onPress = {() => _handlePressButtonAsync(play.external_urls.spotify)}>
          <Image
                source={{
                    url: play.images[0].url,
                }}
                //borderRadius style will help us make the Round Shape Image
                style={{ marginHorizontal: 5, width: 178, height: 178, borderRadius: 50 / 2 }}
              />
        </Pressable>
      );
    })

    const recentlyPlayedView = recents.map((recent) => {
        return(
            <View style={styles.trackRow}>
              
              <Image
                  source={{
                      url: recent.track.album.images[0].url,
                  }}
                  //borderRadius style will help us make the Round Shape Image
                  style={{ marginHorizontal: 10, width: 80, height: 80, borderRadius: 40 / 2 }}
              />
            
                <View style={styles.trackCol}>
                    <Text style={styles.trackText}>{recent.track.name}</Text>
                    {/*<Text style={styles.trackText}>{recent.track.album.name}</Text>*/}
                    <Text style={styles.trackSubText}>{recent.track.artists[0].name}</Text>
                </View>
            </View>
        );
  })

    return (
      <SafeAreaView style={styles.container}>
            <ScrollView>
              
              <ImageBackground source={{
                        url: ProfilePic,
                    }}
                    //borderRadius style will help us make the Round Shape Image
                    imageStyle={{height:150, borderRadius: 25}}>


                  
                {/*<Text style={styles.TrendifyHome}>Profile</Text>*/}


                <View style={styles.statsCenter}>

                <Image
                    source={{
                        url: ProfilePic,
                    }}
                    //borderRadius style will help us make the Round Shape Image
                    style={{ width: 75, height: 75, borderRadius: 75 / 2, bottom: -110}}
                />
                </View>
              </ImageBackground>
              <View style={[styles.statsCenter,{bottom:-90}]}>
             
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
                      <Text style={styles.statsProfile}>{numPlaylists}</Text>
                      <Text style={styles.statsProfileWord}>Playlists</Text>
                    </View>
                  </View>
                </View>
              
                <View>
                  <Text style={styles.playlistTitle}>Playlists:</Text>
                    <ScrollView horizontal={true}>
                      {PlaylistCollection}
                    </ScrollView>
                </View>

              </View>
              
                <View style={{paddingVertical: '3%', bottom:-75}}>
                  <Text style={styles.playlistTitle}>Recenty Played:</Text>
                    {recentlyPlayedView}
                </View>
              
             
              
            </ScrollView>
        </SafeAreaView >
    );
  }

export default RecentlyPlayed;

