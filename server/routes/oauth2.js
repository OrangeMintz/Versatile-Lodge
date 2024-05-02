const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const Admin = require('../models/Admin');

router.get('/', async (req, res) => {
  const code = req.query.code;

  try {
    const redirectURL = "http://localhost:8000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID2,
      process.env.CLIENT_SECRET2,
      redirectURL
    );
    const tokens = await oAuth2Client.getToken(code);

    // Verify the ID token to get user information
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.tokens.id_token,
      audience: process.env.CLIENT_ID2,
    });

    const googleUser = ticket.getPayload();

    // Check if the user already exists in your database
    const user = await Admin.findOne({ email: googleUser.email });

    if (user) {
      if (user.isArchive) {
        // User is archived, deny login
        res.redirect('http://localhost:3001/');
      }

      // User is not archived, create JWT token
      const token = jwt.sign(
        {
          email: user.email,
          username: user.username,
          id: user._id,
          name: user.name,
          image: user.image,
          phoneNumber: user.phoneNumber,
          isReceptionist: user.isReceptionist,
          isManager: user.isManager,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      // Set the token as a cookie in the response
      res.cookie('aToken', token, { httpOnly: true });

      // Redirect to the dashboard
      res.redirect('http://localhost:3001/dashboard');
    } else {
      // User not found, redirect to another page or handle accordingly
      res.redirect('http://localhost:3001/');
    }
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
