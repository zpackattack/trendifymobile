import axios from 'axios'


// GETTING DATA
export const getSpotifyCredentials = async () => {
    const res = await axios.get("/api/spotify-credentials");
    console.log(res.data)
    const spotifyCredentials = res.data;
    return spotifyCredentials;
};
