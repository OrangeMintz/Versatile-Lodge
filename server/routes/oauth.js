const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const Customer = require('../models/Customer');


router.get('/', async function (req, res, next) {
  const code = req.query.code;

  try {
    // const redirectURL = "http://127.0.0.1:8000/oauth"\
    const redirectURL = "http://localhost:8000/oauth"

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const tokens = await oAuth2Client.getToken(code);

    // Verify the id token to get user information
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.tokens.id_token,
      audience: process.env.CLIENT_ID,
    });

    const googleUser = ticket.getPayload();

    // Check if the user already exists in your database
    let user = await Customer.findOne({ email: googleUser.email });

    if (!user) {
      // If user does not exist, create a new user
      user = await Customer.create({
        name: googleUser.name,
        email: googleUser.email,
        image: googleUser.picture,
        googleSign: true
        // ... other properties you want to save
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
        image: user.image,
        address: user.address,
        googleSign: true
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set the token as a cookie in the response with domain set to localhost
    // res.cookie('token', token, { domain: 'localhost', httpOnly: true });
    res.cookie('token', token, { httpOnly: true });



    // Redirect to your frontend application
    res.redirect('http://localhost:3000/');

  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

module.exports = router;











// const jwt = require('jsonwebtoken');
// const express = require('express');
// const router = express.Router();
// const { OAuth2Client } = require('google-auth-library');
// const Customer = require('../models/Customer');

// // ...

// router.get('/', async function (req, res, next) {
//   const code = req.query.code;

//   try {
//     const redirectURL = "http://127.0.0.1:8000/oauth"
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectURL
//     );
//     const tokens = await oAuth2Client.getToken(code);

//     // Verify the id token to get user information
//     const ticket = await oAuth2Client.verifyIdToken({
//       idToken: tokens.tokens.id_token,
//       audience: process.env.CLIENT_ID,
//     });

//     const googleUser = ticket.getPayload();

//     // Check if the user already exists in your database
//     let user = await Customer.findOne({ email: googleUser.email });

//     if (!user) {
//       // If user does not exist, create a new user
//       user = await Customer.create({
//         name: googleUser.name,
//         email: googleUser.email,
//         image: googleUser.picture
//         // ... other properties you want to save
//       });
//     }

//     // Generate JWT token
//     const token = generateToken(user);

//     // Set the token as a cookie in the response
//     res.cookie('token', token);

//     // Also, set user information as a cookie
//     const userCookie = JSON.stringify({
//       email: user.email,
//       id: user._id,
//       name: user.name,
//       image: user.image,
//       // ... (include other fields)
//     });

//     res.cookie('user', userCookie);

//     // Redirect to your frontend application
//     res.redirect('http://localhost:3000/');
//   } catch (err) {
//     console.log('Error logging in with OAuth2 user', err);
//     res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// });

// function generateToken(user) {
//   // Generate and return JWT token
//   return jwt.sign(
//     {
//       email: user.email,
//       id: user._id,
//       name: user.name,
//       image: user.image, // Include user image
//       // ... (include other fields)
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' } // Set an appropriate expiration time
//   );
// }

// module.exports = router;











// const jwt = require('jsonwebtoken');
// const express = require('express');
// const router = express.Router();
// const { OAuth2Client } = require('google-auth-library');
// const Customer = require('../models/Customer');

// // ...

// router.get('/', async function (req, res, next) {
//   const code = req.query.code;

//   try {
//     const redirectURL = "http://127.0.0.1:8000/oauth"
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectURL
//     );
//     const tokens = await oAuth2Client.getToken(code);

//     // Verify the id token to get user information
//     const ticket = await oAuth2Client.verifyIdToken({
//       idToken: tokens.tokens.id_token,
//       audience: process.env.CLIENT_ID,
//     });

//     const googleUser = ticket.getPayload();

//     // Check if the user already exists in your database
//     let user = await Customer.findOne({ email: googleUser.email });

//     if (!user) {
//       // If user does not exist, create a new user
//       user = await Customer.create({
//         name: googleUser.name,
//         email: googleUser.email,
//         image: googleUser.picture
//         // ... other properties you want to save
//       });
//     }

//     // Generate JWT token
//     const token = generateToken(user);

//     // Set the token as a cookie in the response
//     res.cookie('token', token);

//     // Also, set user information as a cookie
//     const userCookie = JSON.stringify({
//       email: user.email,
//       id: user._id,
//       name: user.name,
//       image: user.image,
//       // ... (include other fields)
//     });

//     res.cookie('user', userCookie);

//     // Redirect to your frontend application
//     res.redirect('http://localhost:3000/');
//   } catch (err) {
//     console.log('Error logging in with OAuth2 user', err);
//     res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// });

// function generateToken(user) {
//   // Generate and return JWT token
//   return jwt.sign(
//     {
//       email: user.email,
//       id: user._id,
//       name: user.name,
//       image: user.image, // Include user image
//       // ... (include other fields)
//     },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' } // Set an appropriate expiration time
//   );
// }

// module.exports = router;

















// var express = require('express');
// var router = express.Router();
// const dotenv = require('dotenv');
// dotenv.config(); // Load environment variables from .env file

// const {OAuth2Client} = require('google-auth-library');

// async function getUserData(access_token) {

//   const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

//   //console.log('response',response);
//   const data = await response.json();
//   console.log('data',data);
// }



// /* GET home page. */
// router.get('/', async function(req, res, next) {

//     const code = req.query.code;
//     console.log(code);

//     try {
//         const redirectURL = "http://127.0.0.1:8000/oauth"
//         const oAuth2Client = new OAuth2Client(
//             process.env.CLIENT_ID,
//             process.env.CLIENT_SECRET,
//             redirectURL
//           );
//         const r =  await oAuth2Client.getToken(code);
//         // Make sure to set the credentials on the OAuth2 client.
//         await oAuth2Client.setCredentials(r.tokens);
//         console.info('Tokens acquired.');
//         const user = oAuth2Client.credentials;
//         console.log('credentials',user);

//         const ticket = await oAuth2Client.verifyIdToken({
//             idToken:user.id_token,
//             audience:process.env.CLIENT_ID,
//         });
//         // const email = ticket.getPayload().email;
//         // console.log('User Email:', email);
//         console.log('ticket',ticket);
//         await getUserData(oAuth2Client.credentials.access_token);

//       } catch (err) {
//         console.log('Error logging in with OAuth2 user', err);
//     }


//     res.redirect(303, 'http://localhost:3000/');



// });

// module.exports = router;
