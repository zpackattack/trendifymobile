import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';

export default function profile()
{
    React.useEffect(() => {
        if (response?.type === 'success') {
          const { access_token } = response.params;
          console.log("Access Token: " + access_token);
          storeData(access_token);
          navigation.navigate('MainApp');
        }
      }, [response]);
    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('@access_token');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
      return (
        <View>

        </View>
      )
}