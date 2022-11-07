import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, Pressable, StyleSheet } from 'react-native';
import styles from '../components/styles';
import { AuthSession } from 'expo';



function Home({ navigation }) {
  const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                    'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                    'playlist-modify-private','user-read-recently-played','user-top-read'];
  const scopes = scopesArr.join(' ');

  const getAuthorizationCode = async () => {
    try {
      const credentials = await getSpotifyCredentials() //we wrote this function above
      const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          credentials.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      })
    } catch (err) {
      console.error(err)
    }
    return result.params.code
  }
    return (
      <View style={styles.homeScreeBackground}>
        <Text style={styles.homeTitleText}>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

export default Home;
