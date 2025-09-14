require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const commentRoute = require('./routes/comment');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const liveScoreRoute = require('./routes/livescore');
const app = express();

// PORT for server to run/listen
const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL;
const ORIGIN = process.env.ORIGIN;

// MIDDLEWARES
app.use(cors({ credentials: true, origin: ORIGIN }));
app.use(express.json());
app.use(cookieParser());
app.use("/comments", commentRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/user", userRoute);
app.use("/livescore", liveScoreRoute);

mongoose.connect(DB_URL)
    .then(() => {
        console.log("DB Connected Successfully")
    }).catch((error) => console.log("DB Connection Failed, Error:", error))

app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`);
});