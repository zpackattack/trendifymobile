/*import "react-native-gesture-handler";
import { useEffect } from "react";
import {
    Button,
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import styles from "../components/styles";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";

import * as AuthSession from "expo-auth-session";

import { encode as btoa } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokens } from "../spotifyAuth/refreshTokens";
import { getTokens } from "../spotifyAuth/getTokens";
import { getAuthorizationCode } from "../spotifyAuth/getAuthCode";

function SpotifyLogin({ navigation, route }) {
    

    const componentDidMount = async () => {
        const tokenExpirationTime = await getUserData('expirationTime');
        if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
          await refreshTokens();
        } else {
          this.setState({ accessTokenAvailable: true });
        }
    }

    return (
        <View style={styles.homeScreeBackground}>
            <TouchableOpacity
                onPress={() => {
                    console.log(getAuthorizationCode());
                }}
                style={styles.spotifyLoginButton}
            >
                <Text style={styles.ForgotPassword}>Login to Spotify</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SpotifyLogin;
*/
import styles from "../components/styles";

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyLogin({navigation}) {

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: 'f2654301008b4cba927766c7b3efdbcb',
      scopes: [
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-playback-state",
        "user-library-modify",
        "user-library-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-read-recently-played",
        "user-top-read",
        "user-follow-read"
    ],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: "exp://172.20.10.3:19000",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log("Access Token: " + access_token);
      storeData(access_token);
      console.log(access_token);
      navigation.navigate('MainApp', {accessToken:access_token,});
    }
  }, [response]);

  const storeData = async(token) =>{
    try{
      await AsyncStorage.setItem('@access_Token', token);
      //const value = await AsyncStorage.getItem('@accesstoken');
      //console.log("Value: "+ value);
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <View style={styles.homeScreeBackground}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  )
}
