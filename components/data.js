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
    FlatList,

} from "react-native";

function data()
{
    return(
        <View style={{flex:1, flexDirection: 'row', justifyContent:'center', alignContent:'center',marginBottom:10}}>
            <Text style={localStyles.subtext}>Data obtained from Spotify</Text>
            <Image
                source={
                    require('../images/spotifyLogo.png')
                }
                //borderRadius style will help us make the Round Shape Image
                style={{marginLeft:3, width: 10, height: 10, alignSelf:'center'}}
            />
        </View>
    );
}
export default data;

const localStyles = StyleSheet.create({
    subtext: {
        fontSize: 10,
          alignItems: 'center',
          color: '#FBFBFB',
          fontFamily:'Poppins_300Light',
      },
});