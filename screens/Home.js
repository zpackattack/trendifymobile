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
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthSession } from 'expo';

function Home({ navigation, route }) {

    //const [direction, setDirection] = useState("ltr");
    
    // Testing api
    const [setInput] = React.useState('')
    React.useEffect(() => {
        getData();
      }, [setInput]);
    
    getMyStringValue = async () => {
        try {
          return await AsyncStorage.getItem('@access_Token');
        } catch(e) {
          return null;
        }
      
        console.log('Done.')
      }
    const getData = async () => {
        
        try {
            const value = await AsyncStorage.getItem('@access_Token');
          
          if(value !== null) {
            console.log("value: " + value);
            setInput(value);
            // value previously stored
          }
        } catch(e) {
          // error reading value
        }
      }
      function printdata()
      {
        const value = getData();
        console.log("Value: r" + setInput);

      }
      //end test


    return (

        <View style={styles.homeScreeBackground}>



            <View style = {{flex:1,flexDirection: 'row', backgroundColor:'red'}}>

                <View style= {{flex:1,backgroundColor:'yellow'}}>
                    <TouchableOpacity>
                        <Image
                            style={[styles.searchlogo,{bottom: -20, left: 20}]}
                            source={require("../images/search.png")}
                        />
                    </TouchableOpacity>
                    
                </View>

                
                <View style = {{flex:2,backgroundColor:'green'}}>
                    <Text style={styles.title}>Trendify</Text>
                    
                </View>
                
                <View style = {{flex: 1, backgroundColor:'red'}}>
                    
                    <View style = {{width: 50, height: 50, borderRadius: 50 / 2, bottom: -12, left: 20, backgroundColor: 'blue'}}>
                            <Text
                            
                                //borderRadius style will help us make the Round Shape Image
                                //style={{ width: 50, height: 50, borderRadius: 50 / 2, bottom: 223, left:10, background:'green'}}
                                style={{left:14, bottom: -5, fontSize: 30, color: '#fff'}}
                                >H
                            </Text>


                    </View>

                
                </View>



            </View>
            
            
            <View style = {{flex:4, flexDirection:'row', backgroundColor:'blue'}}>

                <Text style={[styles.subText,{bottom:-45}]}>PlayList</Text>

                <Image style = {{flex:2, height:150, width:150, bottom:-80, left:-50, borderRadius: 20}}
                    source={require("../images/search.png")}
                >
                </Image>



                <Image style = {{flex:2, height:150, width:150, bottom:-80, left:-40, borderRadius: 20}}
                    source={require("../images/search.png")}
                >
                </Image>



                <Button
                
                title="Login"
                onPress={printdata}
                />

            </View>


            <View style = {{flex:5, background: 'red'}}>
                <Text style={[styles.subText, {left: -105}]}>Top Tracks</Text>
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