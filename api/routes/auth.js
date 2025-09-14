require('dotenv').config();
const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// AUTHETICATION & VERIFICATION
const salt_sync = parseInt(process.env.SALT_SYNC, 10)
const salt = bcrypt.genSaltSync(salt_sync);
const secret = process.env.SECRET_KEY;

// CREATE User Endpoint
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        const userDoc = await User.create({
            username,
            email,
            password : hashedPassword
        });
        res.json(userDoc);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// LOGIN User Endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            res.status(400).json({ error: "Invalid Credentials" })
            return
        }
        const userPass = userDoc.password;
        const passwordOk = await bcrypt.compare(password, userPass);
        // const passwordOk = password;
        // console.log(passwordOk)
        // console.log(userPass)
        
        if (passwordOk) {
            jwt.sign({ username, id: userDoc._id }, secret, (error, token) => {
                if (error) {
                    console.error('JWT Sign Error:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.cookie('token', token).json({
                    id: userDoc._id, // getting user id
                    username,
                });
            });
        } else {
            res.status(400).json({ error: "Wrong Credentiials" });
        }
    } catch (error) {
        console.log("Error during Login: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// LOGOUT User Endpoint
router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

// REFETCH User Endpoint
router.get('/refetch', async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("JWT Token Missing in Cookies");
        res.status(401).json({ error: "JWT Token Missing in Cookies" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("JWT Verification Error: ", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: "Invalid token" });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "Token expired" });
        } else {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

module.exports = router;