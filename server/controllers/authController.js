const Customer = require('../models/Customer')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary/cloudinary')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, image } = req.body;

        let uploadedImage;

        if (image) {
            // If image is provided, upload the image to Cloudinary
            uploadedImage = await cloudinary.uploader.upload(image, {
                upload_preset: 'unsigned_upload',
                public_id: `${email}avatar`,
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
            }, function (error, result) {
                if (error) {
                    console.log(error);
                }
                console.log(result);
            });
        } else {
            // If image is not provided, use a default image URL
            uploadedImage = {
                public_id: 'User_Avatar/w0nkngai05o8lbapligf',
                secure_url: 'https://res.cloudinary.com/dl0qncxjh/image/upload/v1699580461/User_Avatar/w0nkngai05o8lbapligf.png'
            };
        }

        // Check if name was entered and does not contain leading/trailing spaces
        if (!name || name.trim() !== name) {
            return res.json({
                error: 'Name is required and should not contain leading/trailing spaces'
            });
        }

        // ... (rest of your validation logic)

        // Check email
        const exist = await Customer.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await Customer.create({
            name,
            email,
            password: hashedPassword,
            image: `https://res.cloudinary.com/dl0qncxjh/image/upload/${uploadedImage.public_id}`
        });

        const imageUrl = `https://res.cloudinary.com/dl0qncxjh/image/upload/${user.image}`;
        const userWithImage = { ...user.toObject(), imageUrl };

        return res.json(userWithImage);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

// Update User Endpoint COMMENTED UPDATE USER FUNCTION
// const updateUser = async (req, res) => {
//     try {
//         const { name, email, address } = req.body;

//         // Build the update object dynamically
//         const updateObject = {};
//         if (name) updateObject.name = name;
//         if (email) updateObject.email = email;
//         if (address) updateObject.address = address;

//         // Assuming 'updatedUser' contains the updated user information
//         const updatedUser = await Customer.findByIdAndUpdate(
//             req.user.id,
//             { $set: updateObject },
//             { new: true }
//         );

//         const updatedToken = jwt.sign(
//             {
//                 email: updatedUser.email,
//                 id: updatedUser._id,
//                 name: updatedUser.name,
//                 image: updatedUser.image,
//                 // ... (include other fields)
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' } // Set an appropriate expiration time
//         );

//         res.cookie('token', updatedToken).json(updatedUser);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// };

// Update User Endpoint
const updateUser = async (req, res) => {
    try {
        const { name, email, address, image } = req.body;

        let uploadedImage;

        if (image) {
            // If image is provided, upload the image to Cloudinary
            uploadedImage = await cloudinary.uploader.upload(image, {
                upload_preset: 'unsigned_upload',
                public_id: `${email}avatar`,
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
            });
        } else {
            // If image is not provided, use a default image URL
            uploadedImage = {
                public_id: 'User_Avatar/w0nkngai05o8lbapligf',
                secure_url: 'https://res.cloudinary.com/dl0qncxjh/image/upload/v1699580461/User_Avatar/w0nkngai05o8lbapligf.png',
            };
        }

        // Build the update object dynamically
        const updateObject = {};
        if (name) updateObject.name = name;
        if (email) updateObject.email = email;
        if (address) updateObject.address = address;
        updateObject.image = `https://res.cloudinary.com/dl0qncxjh/image/upload/${uploadedImage.public_id}`;

        // Assuming 'updatedUser' contains the updated user information
        const updatedUser = await Customer.findByIdAndUpdate(
            req.user.id,
            { $set: updateObject },
            { new: true }
        );

        const updatedToken = jwt.sign(
            {
                email: updatedUser.email,
                id: updatedUser._id,
                name: updatedUser.name,
                image: updatedUser.image,
                address: updatedUser.address,
                // ... (include other fields)
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Set an appropriate expiration time
        );

        res.cookie('token', updatedToken).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};




//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password, address, image } = req.body;

        // Check if user exists
        const user = await Customer.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);

        if (match) {
            // Password matches, you can proceed with user authentication here.
            const imageUrl = `https://res.cloudinary.com/dl0qncxjh/image/upload/${user.image}`;
            const userWithImage = { ...user.toObject() };

            jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    name: user.name,
                    image: user.image,
                    address: user.address
                },

                // process.env.JWT_SECRET, {}, (err, token) => {
                process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) throw err;
                    res.cookie(`token`, token).json(userWithImage)
                })

        } else {
            res.json({
                error: 'Password does not match'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    }
    else {
        res.json(null)
    }
}

const getUser = (req, res) => {

}

const updateUserInformation = (req, res) => {

}




module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateUser,
    getUser,
    updateUserInformation
}