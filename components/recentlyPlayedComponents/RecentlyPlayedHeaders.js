import 'react-native-gesture-handler';
import * as React from 'react';
import styles from "../components/styles";
import {
    Button,
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView, 
    ScrollView,
} from "react-native";

export default function headerRP({route})
{
    const {ProfilePic} = route.params;
    return(
        <View>
        <Text style={styles.TrendifyHome}>Profile</Text>
              <View style={styles.statsCenter}>
              <Image
                  source={{
                      url: ProfilePic,
                  }}
                  //borderRadius style will help us make the Round Shape Image
                  style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
              />
              </View>
             
              
              </View>
    );
}
