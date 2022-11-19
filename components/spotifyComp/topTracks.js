import styles from "../styles";
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

function topTracks({topTenTracks})
{
    const topTenTracksView = topTenTracks.map((track) => {
    
        return(
            <View style={styles.trackRow}>
            <Image
                  source={{
                      url: track.album.images[0].url,
                  }}
                  //borderRadius style will help us make the Round Shape Image
                  style={{ marginHorizontal: 10, width: 80, height: 80, borderRadius: 40 / 2 }}
                />
                <View style={styles.trackCol}>
                    <Text style={styles.trackText}>{track.name}</Text>
                    <Text style={styles.trackText}>{track.album.name}</Text>
                    <Text style={styles.trackText}>{track.artists[0].name}</Text>
                </View>
            </View>
        );
    })

    return(
        <View>
            {topTenTracksView}
        </View>
    );
}
export default topTracks;