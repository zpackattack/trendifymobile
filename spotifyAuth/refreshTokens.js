import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSpotifyCredentials } from "./getSpotifyCredentials";
import { encode as btoa } from "base-64";

export const refreshTokens = async () => {
    try {
        const credentials = await getSpotifyCredentials()
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const refreshToken = await getUserData("refreshToken");
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${credsB64}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();
        if (responseJson.error) {
            await getTokens();
        } 
        else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await AsyncStorage.setItem(NEW_ACCESS_TOKEN, JSON.stringify(responseData));
            if (newRefreshToken) {
                await AsyncStorage.setItem(NEW_REFRESH_TOKEN, JSON.stringify(responseData));
            }
            await AsyncStorage.setItem(NEW_EXPIRATION_TIME, JSON.stringify(responseData));
        }
    } catch (err) {
        console.error(err);
    }
};