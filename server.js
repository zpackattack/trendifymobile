const router = require('express').Router();


router.get('/api/spotify-credentials', (req, res, next) => {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = proces.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const spotifyCredentials = {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI};
    res.json(spotifyCredentials);
});