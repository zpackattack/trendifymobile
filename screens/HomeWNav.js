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
import * as WebBrowser from 'expo-web-browser';
import topTenTrackComp from '../components/spotifyComp/topTracks'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Route } from 'react-native';

//import Nav from "../components/spotify/spotify.nav"
import Profile from "../components/spotify/spotify.profile"
//import Tracks from "../components/spotify/spotify.tracks"
//import Artists from "../components/spotify/spotify.artists"
//import Player from "../components/spotify/spotify.player"
//import Playlists from "../components/spotify/spotify.playlists"

const spotifyApi = new SpotifyWebApi({
    clientId: 'f2654301008b4cba927766c7b3efdbcb',
    redirectUri: "exp://172.20.10.3:19000",
  })
  
export default function Dashboard({route, navigation}) {   
    //const currentPath = window.location.pathname;
    

    // Stores the result from the api calls
    const [user, setUser] = useState([]);
    const [numFollowing, setNumFollowing] = useState();
    const [numFollowers, setNumFollowers] = useState();
    const [numPlaylists, setNumPlaylists] = useState();
    const [playlist, setPlaylist] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [ProfilePic, setProfilePic] = useState();
    const [topTenArtists, setTopTenArtists] = useState([]);
    const [secondFive, setSecondFive] = useState([]);
    const [playlistCover, setPlaylistCover] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topTenTracks, setTopTenTracks] = useState([]);
    const [recents, setRecents] = useState();
    const { accessToken } = route.params;
    //console.log("working?: "+ accessToken);

    const [timeRange, setTimeRange] = useState('long_term');
    const updateTimeRange = (timeTerm) => {
        setTimeRange(timeTerm);
    }
    
    // ACCESS TOKEN
    useEffect(() => {
        if (!accessToken){console.log("NO"); return;}
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])
    let useAltPFP = false;
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
    
    // PLAYLIST 

    useEffect(() => {
        if(!user.id) return
        spotifyApi.getUserPlaylists(user.id).then(
            function(data) {
                const j = JSON.stringify(data.body);
                setPlaylist(data.body.items);
                //console.log('Playlist: '+ data.body.items[0].images[0].url);
                setPlaylistCover(data.body.items[0].images[0].url);
                setNumPlaylists(data.body.total);
                
            },
            function(err) {
            console.log('Something went wrong.. here', err.message);
            }
        );
    }, [, user])
    

    // TOP ARTISTS
    useEffect(() => {
        //if(!accessToken) return
        
        spotifyApi.getMyTopArtists({limit : 10 , time_range: timeRange})
        .then(function(data) {
            setTopTenArtists(data.body.items);
            if(useAltPFP)
            {
                setProfilePic(data.body.items[0].images[0].url);
            }
            
            //setTopArtistPic(data.body.items[0].images[0].url)
            //console.log('TopArt1'+ data.body.items);

        });
    }, [timeRange])
    

    // TOP TRACKS 
    useEffect(() => {
        //if(!accessToken) return
        spotifyApi.getMyTopTracks({limit : 10 , time_range: timeRange})
        .then(function(data) {
            setTopTenTracks(data.body.items);
            setSecondFive(data.body.items);
            //console.log(data.body.items[0].name)
        }, function(err) {
            console.log('Something went wrong! ', err);
        });
    }, [timeRange])
    /*
    
    // SHOW RECENTLY PLAYED TRACKS
    useEffect(() => {
        //if(!accessToken) return
        spotifyApi.getMyRecentlyPlayedTracks({
            limit : 50
        }).then(function(data) {
            // Output items
            setRecents(data.body.items)
        }, function(err) {
            console.log('Something went wrong!', err);
        }
    );}, [])
*/
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
                      style={{ marginHorizontal: 10, width: 200, height: 200, borderRadius: 50 / 2 }}
                    />
                </Pressable>
            );
    })


    const topTenTracksView = topTenTracks.map((track, index) => {
    
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
                    <Text style={styles.trackText}>{track.name}</Text>
                    <Text style={styles.trackText}>{track.album.name}</Text>
                    <Text style={styles.trackSubText}>{track.artists[0].name}</Text>
                </View>
            </View>
        );
})
/*
const topTenTracksView2 = secondFive.slice(5,10).map((track, index) => {
    
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
                <Text style={styles.trackText}>{track.name}</Text>
                <Text style={styles.trackText}>{track.album.name}</Text>
                <Text style={styles.trackSubText}>{track.artists[0].name}</Text>
            </View>
        </View>
    );
})
*/

const topTenArtistView = topTenArtists.map((art) => {
    
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

function goToProfile()
{
    navigation.navigate('RecentlyPlayed', {accessToken: accessToken});
}
    

    return(
        <SafeAreaView style={styles.homeContainer}>
            <ScrollView>
                <View style={styles.headerRow}>
                    <Text style={styles.TrendifyHome}>Trendify</Text>
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
                
                <View>
                <Text style={styles.playlistTitle}>Playlists:</Text>
                  <ScrollView horizontal={true}>
                    {PlaylistCollection}
                  </ScrollView>

                </View>

                <View style={{paddingVertical: '5%'}}>
                <Text style={styles.playlistTitle}>Top 10 Tracks:</Text>
                <ScrollView horizontal={true}>
                  {topTenTracksView }
                </ScrollView>
                </View>

                <View style={{paddingVertical: '5%'}}>
                <Text style={styles.playlistTitle}>Top 10 Artists:</Text>
                  {topTenArtistView}
                </View>

            </ScrollView>
        </SafeAreaView >
     );

    /*return (
        <View>

            <Profile     
            profile = {user}
            numFollowing = {numFollowing}
            playlist = {playlist}
            topTracks = {topTenTracks}
            topArtists = {topTenArtists}
            /> 
        
        </View>
    )*/
}

