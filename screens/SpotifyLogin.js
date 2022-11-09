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
