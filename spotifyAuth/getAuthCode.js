import { AuthSession } from "expo";
import { getSpotifyCredentials } from "./getSpotifyCredentials";
import { spotifyCredentials } from "../secrets";

const scopesArr = [
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
];
const scopes = scopesArr.join(" ");

export const getAuthorizationCode = async () => {
    let result = null;
    try {
        const redirectUrl = await AuthSession.getRedirectUrl();
        result = await AuthSession.startAsync({
            authUrl:
                "https://accounts.spotify.com/authorize" +
                "?response_type=code" +
                "&client_id=" +
                spotifyCredentials.CLIENT_ID +
                (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
                "&redirect_uri=" +
                encodeURIComponent(redirectUrl),
        });
    } catch (err) {
        console.error(err);
    }
    return result.params.code;
};
