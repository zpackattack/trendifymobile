import "react-native-gesture-handler";
import * as React from "react";
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



function Home({ navigation, route }) {
    return (
        <View style={styles.homeScreeBackground}>
            <View style={styles.navigation}>
                <TouchableOpacity>
                    <Image
                        style={styles.searchLogo}
                        source={require("../images/search.png")}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Trendify</Text>
            </View>
            
            <Text style={styles.homeTitleText}>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate("Details")}
            />
        </View>
    );
}

export default Home;
