import Home from './Home';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import RecentlyPlayed from './RecentlyPlayed';

import { useState, useEffect } from "react"
//import useAuth from "../components/spotify.useAuth"
import SpotifyWebApi from "spotify-web-api-node"

import Nav from "../components/spotify/spotify.nav"
import Profile from "../components/spotify/spotify.profile"
import Tracks from "../components/spotify/spotify.tracks"
import Artists from "../components/spotify/spotify.artists"
//import Player from "../components/spotify/spotify.player"
import Playlists from "../components/spotify/spotify.playlists"

const spotifyApi = new SpotifyWebApi({
    clientId: 'f2654301008b4cba927766c7b3efdbcb',
  })
  
export default function Dashboard({ code }) {   
    //const currentPath = window.location.pathname;

    // Stores the result from the api calls
    const [user, setUser] = useState();
    const [numFollowing, setNumFollowing] = useState();
    const [playlist, setPlaylist] = useState();
    const [topArtists, setTopArtists] = useState();
    const [topTenArtists, setTopTenArtists] = useState();
    const [topTracks, setTopTracks] = useState();
    const [topTenTracks, setTopTenTracks] = useState();
    const [recents, setRecents] = useState();

    const [timeRange, setTimeRange] = useState('long_term');
    const updateTimeRange = (timeTerm) => {
        setTimeRange(timeTerm);
    }

    // ACCESS TOKEN
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        
        try {
            const value = await AsyncStorage.getItem('@access_Token');
          
          if(value !== null) {
            console.log("value: " + value);
            spotifyApi.setAccessToken(value);
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
      }
    
    // AUTHENTICATED USER
    useEffect(() => {
        //if(!accessToken) return
        spotifyApi.getMe().then(res => {
            setUser(res.body)
        });
    }, [])

    // FOLLOWING 
    useEffect(() => {
        //if(!accessToken) return
        spotifyApi.getFollowedArtists().then(
            function(data) {
            setNumFollowing(data.body.artists.total);
            },
            function(err) {
            console.log('Something went wrong..', err.message);
            }
    );}, [])

    // PLAYLIST 
    useEffect(() => {
        //if(!accessToken) return
        if(!user) return
        spotifyApi.getUserPlaylists(user.id).then(
            function(data) {
                //console.log('Retrieved playlists', data.body);
                setPlaylist(data.body);
            },
            function(err) {
            console.log('Something went wrong..', err.message);
            }
    );}, [, user])

    // TOP ARTISTS
    useEffect(() => {
        //if(!accessToken) return
        spotifyApi.getMyTopArtists({limit : 50 , time_range: timeRange})
        .then(function(data) {
            let topArtists = data.body.items;
            setTopArtists(topArtists);

        });
        spotifyApi.getMyTopArtists({limit : 10 , time_range: "long_term"})
        .then(function(data) {
            let topArtists = data.body.items;
            setTopTenArtists(topArtists);

        });
    }, [timeRange])

    // TOP TRACKS 
    useEffect(() => {
        //if(!accessToken) return
        spotifyApi.getMyTopTracks({limit : 50 , time_range: timeRange})
        .then(function(data) {
            let topTracks = data.body.items;
            setTopTracks(topTracks)
        }, function(err) {
            console.log('Something went wrong!', err);
        });

        spotifyApi.getMyTopTracks({limit : 10 , time_range: 'long_term'})
        .then(function(data) {
            let topTracks = data.body.items;
            setTopTenTracks(topTracks)
        });
    }, [timeRange])
    
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


    return (
        <div>
          
                            <Profile     
                            profile = {user}
                            numFollowing = {numFollowing}
                            playlist = {playlist}
                            topTracks = {topTenTracks}
                            topArtists = {topTenArtists}
                            /> 
                        
        </div>
)}

