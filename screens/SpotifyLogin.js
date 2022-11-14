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

import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';


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
      scopes: ['Treyz3@icloud.com', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'exp://localhost:19000/--/'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      navigation.navigate('MainApp');
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
