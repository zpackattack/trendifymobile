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
    FlatList,

} from "react-native";

import Data from "../components/data";
import { useState, useEffect } from "react";
import axios from 'axios';
//import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node";
import * as WebBrowser from 'expo-web-browser';
import topTenTrackComp from '../components/spotifyComp/topTracks'
import { useFonts } from 'expo-font';



const spotifyApi = new SpotifyWebApi({
    clientId: 'f2654301008b4cba927766c7b3efdbcb',
    redirectUri: "exp://172.20.10.3:19000",
  })
  
export default function Dashboard({route, navigation}) {   

    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../fonts/Poppins-Bold.ttf'),
        'Poppins-Light': require('../fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../fonts/Poppins-Medium.ttf'),
      });
      if(!fontsLoaded)
      {
        console.log("noFont");
      }
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
    const [playlistCover, setPlaylistCover] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topTenTracks, setTopTenTracks] = useState([]);
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
    }, [accessToken]);
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
    }, [accessToken]);

    // FOLLOWING 
    /*
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
    */
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
    }, [, user]);
    

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
    }, [timeRange]);
    

    // TOP TRACKS 
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.getMyTopTracks({limit : 10 , time_range: 'long_term'})
        .then(function(data) {
            setTopTracks(data.body.items)
        //console.log(data.body.items[0].name)
    }, function(err) {
        console.log('Something went wrong! ', err);
    });
    }, [timeRange])

    //Open Spotify
    const _handlePressButtonAsync = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    };

    const PlaylistCollection = playlist.map((play) => {
    
            return(
                <View style={{flex:1,
                    flexDirection: 'column', 
                    alignContent: 'center', width: 190, marginHorizontal: 5,marginTop:5}}>
                <Pressable onPress = {() => _handlePressButtonAsync(play.external_urls.spotify)}>
                <Image
                      source={{
                          url: play.images[0].url,
                      }}
                      //borderRadius style will help us make the Round Shape Image
                      style={{ marginHorizontal: 5, width: 185, height: 185, borderRadius: 50 / 2 }}
                    />
                <Text numberOfLines={1} style={localStyles.tracks}>{play.name}</Text>
                </Pressable>
                </View>
            ); 
    });

    
    const topTenTracksView = topTracks.map((track, index) => {
    
        return(
            <Pressable onPress={() => navigation.navigate('Track', {accessToken:accessToken, popularity: track.popularity,spotifyurl: track.external_urls.spotify,lastScreen: "Home",trackUrl: track.album.images[0].url,song:track.name, artist:track.artists[0].name, album:track.album.name, songID:track.id})}>
            <View style={styles.trackRow}>
            

            <Image
            source={{
                url: track.album.images[0].url,
            }}
            //borderRadius style will help us make the Round Shape Image
            style={{ marginHorizontal: 10, width: 60, height: 60, borderRadius: 30 / 2 }}
            />
            
            <Text style={styles.numText}>{index+1}</Text>
            
            <View style={styles.trackCol}>
                <Text style={styles.trackText}>{track.name}</Text>
                {/*<Text style={styles.trackText}>{track.album.name}</Text>*/}
                <Text style={styles.trackSubText}>{track.artists[0].name}</Text>
            </View>
        </View>
        </Pressable>
    );
    });


const topTenArtistView = topTenArtists.map((art) => {
    return(
        <View style={{marginBottom: 20}}>
            <Pressable onPress={() => _handlePressButtonAsync(art.external_urls.spotify)}>
            <Image
                source={{
                    url: art.images[0].url,
                }}
                //borderRadius style will help us make the Round Shape Image
                style={{ marginHorizontal: 10, width: 110, height: 110, borderRadius: 110 / 2 }}
            />
           
            <View style={styles.artistCol}>
                <Text style={styles.artistText}>{art.name}</Text>
            </View>
            </Pressable>
        </View>
        
    );

});



    return(
        <SafeAreaView style={styles.homeContainer}>
            <ScrollView>
                <View style={styles.headerRow}>
                <View style={{alignItems: 'flex-end', left: 40}}>
                    
                    <Image
                            style={{width: 180, height: 75, resizeMode: 'contain', marginTop:5,}}
                            source={require("../images/TrendifyWord.png")}
                    />
                    </View>
                    {/*
                    <Text style={localStyles.Trendify}>Trendify</Text>
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
                
                <View>
                <Text style={styles.playlistTitle}>Playlists</Text>
                  <ScrollView horizontal={true}>
                    {PlaylistCollection}
                  </ScrollView>

                </View>

                <View style={{paddingVertical: '5%'}}>
                <Text style={styles.playlistTitle}>Top 10 Tracks</Text>
                  {topTenTracksView}
                </View>

                <View style={{paddingVertical: '5%'}}>
                <Text style={styles.playlistTitle}>Top 10 Artists</Text>
                    <ScrollView horizontal={true}>
                        {topTenArtistView}
                    </ScrollView>
                </View>

                <Data/>

            </ScrollView>
        </SafeAreaView >
     );

}

const localStyles = StyleSheet.create({
    Trendify: {
        fontSize: 40, color: '#FBFBFB', 
        textAlign: 'center',marginBottom: 15, marginTop: 10,

    },

   
    tracks: {
      fontSize: 20, alignItems: 'left', color: '#FBFBFB',fontFamily:'Poppins-Medium',
    },
    trackSubtext: {
      fontSize: 20,
        alignItems: 'left',
        color: '#FBFBFB',
        fontFamily:'Poppins-Light',
    },
    titles: {
        fontSize: 25,
        color:  '#FBFBFB',
        fontFamily:'Poppins-Medium',
        textAlign: 'left',
        paddingLeft: '3%',
        height: 40,
    },
    
  
  });