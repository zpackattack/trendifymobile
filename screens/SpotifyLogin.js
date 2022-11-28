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
/*import {
  useFonts,
  Poppins_500Medium,
  Poppins_200Regular,
  Poppins_300Light,
  Poppins_400Regular,
} from "@expo-google-fonts/dev";
*/
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from 'expo-font';
import appLoading from'expo-app-loading';


WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyLogin({navigation}) {
   //FONTS
   let [fontsLoaded] = useFonts({
    'Poppins-Medium': require('../fonts/Poppins-Medium.ttf'),
  });


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
      console.log(access_token);
      navigation.navigate('MainApp', {accessToken:access_token,});
    }
  }, [response]);


  return (
    <View style={styles.homeScreeBackground}>
      <Pressable
        style={styleLocal.loginButton}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
      <Image
          source={
              require('../images/spotifyLogo.png')
          }
          //borderRadius style will help us make the Round Shape Image
          style={{width: 50, height: 50, alignSelf:'center'}}
        />
      <Text style={styleLocal.loginText}>Spotify Login</Text>
      </Pressable>
    </View>
  )
}
const styleLocal = StyleSheet.create({
  loginButton:{
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 50 / 2,
    backgroundColor: '#110118',
  },
  loginText: {
    color: '#1BD760',
    
    marginTop:3,
  }
});