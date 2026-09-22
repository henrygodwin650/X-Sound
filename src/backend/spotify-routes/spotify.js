import express from "express";
import axios from "axios";

const router = express.Router();

let accessToken = "";
let expiresAt = 0;

// ======================================
// Get Spotify Access Token
// ======================================

async function getAccessToken() {

  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),

        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;

  expiresAt =
    Date.now() +
    response.data.expires_in * 1000 -
    60000;

  return accessToken;
}

// ======================================
// Get Token Route
// ======================================

router.get("/token", async (req, res) => {

  try {

    const token = await getAccessToken();

    res.json({
      success: true,
      token,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });

  }

});

// ======================================
// Featured Playlists
// ======================================

router.get("/featured-playlists", async (req, res) => {

  try {

    const token = await getAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json(error.response?.data);

  }

});

// ======================================
// Search Tracks
// ======================================

router.get("/search", async (req, res) => {

  try {

    const token = await getAccessToken();

    const q = req.query.q || "Adele";

    const response = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q,
          type: "track",
          limit: 20,
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    console.log(error.response?.data);

    res.status(500).json(error.response?.data);

  }

});

router.get("/album/:id", async (req, res) => {

  try {

    const token = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json(error.response?.data);

  }

});

// CATEGORY

router.get("/new-releases", async (req, res) => {

  try {

    const token = await getAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json(error.response?.data);

  }

});

// ======================================
// Categories
// ======================================

router.get("/categories", async (req, res) => {

  try {

    const token = await getAccessToken();

    const response = await axios.get(
      "https://api.spotify.com/v1/browse/categories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });

  }

});

export default router;