// CricketData API Key: https://api.cricapi.com
require('dotenv').config();
const express = require("express");
const route = express.Router();
const CRICKET_API_URL = process.env.CRICKET_API_URL;
const CRICKET_API_KEY = process.env.CRICKET_API_KEY;

route.get("/cricket", async (req, res) => {
   try {
      const response = await fetch(`${CRICKET_API_URL}/series?apikey=${CRICKET_API_KEY}&offset=0`);
      const data = await response.json();
      // console.log(data);
      res.json(data);
   } catch (error) {
      console.log("ERROR Loading Match Data: ", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = route;