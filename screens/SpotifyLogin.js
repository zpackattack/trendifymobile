import "react-native-gesture-handler";
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
import styles from "../../components/styles";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";

import * as AuthSession from "expo-auth-session";

import { encode as btoa } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SpotifyLogin({ navigation, route }) {
    // GETTING DATA
    const getSpotifyCredentials = async () => {
        const res = await axios.get("/api/spotify-credentials");
        const spotifyCredentials = res.data;
        return spotifyCredentials;
    };

    const scopesArr = [
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
    ];
    const scopes = scopesArr.join(" ");

    // CONNECTING TO SPOTIFY
    const getAuthorizationCode = async () => {
        try {
            const credentials = getSpotifyCredentials();
            const redirectUrl = AuthSession.makeRedirectUri();
            const result = await AuthSession.startAsync({
                authUrl:
                    "https://accounts.spotify.com/authorize" +
                    "?response_type=code" +
                    "&client_id=" +
                    credentials.clientId +
                    (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
                    "&redirect_uri=" +
                    encodeURIComponent(redirectUrl),
            });
        } catch (err) {
            console.error(err);
        }
        return result.params.code;
    };
    // API ACCESS TOKEN
    const getTokens = async () => {
        try {
            const authorizationCode = getAuthorizationCode();
            const credentials = getSpotifyCredentials();
            const credsB64 = btoa(
                `${credentials.clientId}:${credentials.clientSecret}`
            );
            const response = await fetch(
                "https://accounts.spotify.com/api/token",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${credsB64}`,
                        "Content-Type": "application/x-wwww-form-urlencoded",
                    },
                    body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`,
                }
            );
            const responseJson = await response.json();

            const {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await AsyncStorage.setItem(
                ACCESS_TOKEN,
                JSON.stringify(responseData)
            );
            await AsyncStorage.setItem(
                REFRESH_TOKEN,
                JSON.stringify(responseData)
            );
            await AsyncStorage.setItem(
                EXPIRATION_TIME,
                JSON.stringify(responseData)
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View style={styles.homeScreeBackground}>
            <TouchableOpacity
                onPress={() => {
                    getAuthorizationCode();
                }}
                style={styles.spotifyLoginButton}
            >
                <Text style={styles.ForgotPassword}>Login to Spotify</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SpotifyLogin;
