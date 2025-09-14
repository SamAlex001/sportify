const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// AUTHETICATION & VERIFICATION
const salt_sync = parseInt(process.env.SALT_SYNC, 10)
const salt = bcrypt.genSaltSync(salt_sync);
const secret = process.env.SECRET_KEY;

// GET User Info Endpoint: Check Login Status
router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    // console.log("Received Token: ", token)

    // VERIFY JWT Token
    try {
        if (token) {
            jwt.verify(token, secret, {}, (error, info) => {
                if (error) {
                    console.error('JWT Verification Error:', error);
                    res.status(401).json({ error: 'Unauthorized' });
                }
                res.json(info); // info => JWT response
            });
        }
        // if (!token) { console.log("Empty Token Recieved"); }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ 'error': 'Internal Server Error' })
    }
});

// GET User Info by ID Endpoint
router.get('/viewprofile/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
    try {
        // VERIFY JWT Token
        jwt.verify(token, secret, {}, async (error, info) => {
            if (error) {
                console.error('JWT Verification Error:', error);
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                try {
                    const userDoc = await User.findById(id).populate('username');
                    if (!userDoc) {
                        res.status(404).json({ error: 'User not found' });
                    } else {
                        const responseData = { userDoc, info }; // Combine userDoc => DB response and info => JWT response into a single object
                        res.json(responseData);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE Profile
/*
router.put('/updateprofile/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        await User.updateOne({ _id: id }, { username, email, password });
        const updatedUser = await User.findById(id);
        const newToken = jwt.sign({
            id: updatedUser._id,
            username: updatedUser.username,
            password: updatedUser.password
        }, secret);
        res.cookie('token', newToken);
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    }
    catch (error) {
        console.log('Error Updating Profile: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

*/

router.put('/updateprofile/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        // Hash the new password if provided
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        
        // Prepare the update object
        const updateData = { username, email };
        if (hashedPassword) {
            updateData.password = hashedPassword; // Add hashed password to update data if provided
        }

        // Update the user's profile
        await User.updateOne({ _id: id }, updateData);

        // Retrieve the updated user
        const updatedUser = await User.findById(id);

        // Generate a new token with updated user information
        const newToken = jwt.sign({
            id: updatedUser._id,
            username: updatedUser.username,
            // Do not include the password in the JWT payload
        }, secret);

        // Set the new token in the response cookie
        res.cookie('token', newToken);

        // Send success response
        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.log('Error Updating Profile: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;