import { encode as btoa } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthorizationCode } from "./getAuthCode";
import { getSpotifyCredentials } from "./getSpotifyCredentials";

// API ACCESS TOKEN
export const getTokens = async () => {
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