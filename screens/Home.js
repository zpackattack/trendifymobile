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
// import { AuthSession } from 'expo';

function Home({ navigation, route }) {

    //const [direction, setDirection] = useState("ltr");

    return (

        <View style={styles.homeScreeBackground}>



            <View style = {{flex:1,flexDirection: 'row', padding: 30}}>

                <View style= {{flex:1}}>
                    <TouchableOpacity>
                        <Image
                            style={styles.searchlogo}
                            source={require("../images/search.png")}
                        />
                    </TouchableOpacity>
                    
                </View>

                
                <View style = {{flex:2}}>
                    <Text style={styles.title}>Trendify</Text>
                    
                </View>
                
                <View style = {{flex: 1, backgroundColor:'red'}}>
                    
                    <View style = {{left: ,width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: 'blue'}}>
                            <Text
                            
                            //borderRadius style will help us make the Round Shape Image
                            //style={{ width: 50, height: 50, borderRadius: 50 / 2, bottom: 223, left:10, background:'green'}}
                            style={{textText: 'center', justifyContent: 'center', fontSize: 30, color: '#fff'}}
                            >H
                            </Text>


                    </View>

                
                </View>



            </View>
            
            
            <View style = {{flex:2,padding: 30}}>

                <Text style={styles.subText}>PlayList</Text>

            </View>


            <View style = {{flex:2,padding:30}}>
                <Text style={styles.subText}>Top Tracks</Text>
            </View>

                



        </View>

        
    );

    /*
    <div class = "bg-[#111827] min-h-screen font-poppins">
    <Nav />
    <>
        {user && numFollowing && topTracks && topArtists && accessToken ?
            <div>
                {currentPath.includes('/profile') ? 
                    <Profile     
                    profile = {user}
                    numFollowing = {numFollowing}
                    playlist = {playlist}
                    topTracks = {topTenTracks}
                    topArtists = {topTenArtists}
                    /> : 
                null }
                {currentPath.includes('/toptracks') ? 
                    <Tracks path = '/toptracks'      
                    topTracks = {topTracks}
                    setTimeRange = {updateTimeRange}
                /> : 
                null }
                {currentPath.includes('/topartist') ? 
                    <Artists     
                    topArtists = {topArtists}
                    setTimeRange = {updateTimeRange}
                    /> : 
                null }
                {currentPath.includes('/player') ? 
                    <Player 
                        accessToken={accessToken}
                        user = {user}
                    /> : 
                null }
                {currentPath.includes('/playlist') ? 
                    <Playlists     
                    playlist = {playlist}
                    recents = {recents}
                    /> : 
                null }
            </div>
        :
        <div class = "flex h-screen justify-center items-center">
                <div class="
                spinner-border
                animate-spin
                inline-block
                w-8
                h-8
                border-4
                rounded-full
                text-purple-500
                " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        }
    </>
    </div>
    */
    }

export default Home;
/*
<View style={{width: '25%', height: '12%', backgroundColor: 'steelblue'}}>
                <Button
                    title="Top Tracks"
                    //onPress={() => navigation.navigate("Details")}
                />
            </View>
            
            <View style={{width: '25%', height: '12%', backgroundColor: 'steelblue'}}>
            
            <Button
                title="Top Artists"
                //onPress={() => navigation.navigate("Details")}
            />
            </View>

            <View style={{width: '25%', height: '12%', backgroundColor: 'steelblue'}}>
            <Button
                title=""
                //onPress={() => navigation.navigate("Details")}
            />
            </View>

            <View style={{width: '25%', height: '12%', backgroundColor: 'steelblue'}}>
            <Button
                title="Top Artists"
                //onPress={() => navigation.navigate("Details")}
            />
            </View>
        */

//original plan
/*
<View style={[styles.navigation]}>

                    <View>
                        <TouchableOpacity>
                            <Image
                                style={styles.searchlogo}
                                source={require("../images/search.png")}
                            />
                        </TouchableOpacity>
                    
                    </View>

                
                    <View style = {{flex:2}}>
                        <Text style={styles.title}>Trendify</Text>
                    
                    </View>
                
                    <View style = {{width: 50, height: 50, borderRadius: 50 / 2, bottom: 223, left:10, backgroundColor:'red', left: -15}}>

                        <Text
                        
                        //borderRadius style will help us make the Round Shape Image
                        //style={{ width: 50, height: 50, borderRadius: 50 / 2, bottom: 223, left:10, background:'green'}}
                        style={{textAlign: 'center',textAlign: 'center', justifyContent: 'center', fontSize: 30, color: '#fff'}}
                        >H
                        </Text>
                    </View>


                </View>
*/