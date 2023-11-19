const Customer = require('../models/Customer')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary/cloudinary')


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


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

        const nameRegex = /^[a-zA-Z ]+$/;
        if (!nameRegex.test(name)) {
            return res.json({
                error: 'Name should not contain numbers and special characters'
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

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: 'Invalid email format'
            });

        }

        // Validate password format using regex
        if (!passwordRegex.test(password)) {
            return res.json({
                error: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, a number, and special character. It should be at least 8 characters long'
            });
        }

        // Validate name format


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

        // res.cookie('token', updatedToken).json(updatedUser);
        res.cookie('token', updatedToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        }).json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};



// Update Password Endpoint
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        // Validate current password
        const user = await Customer.findById(req.user.id);

        // Check if the user signed in with Google
        if (user.googleSign) {
            return res.status(400).json({ error: 'Cannot update password for users signed in with Google' });
        }

        const match = await comparePassword(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Validate new password and confirm new password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: 'New password and confirm new password do not match' });
        }

        // Validate the new password using a regex
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                error: 'New password must contain at least 1 lowercase letter, 1 uppercase letter, a number, and special character. It should be at least 8 characters long.',
            });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(newPassword);

        // Update user password
        const updatedUser = await Customer.findByIdAndUpdate(
            req.user.id,
            { $set: { password: hashedPassword } },
            { new: true }
        );

        res.json(updatedUser);
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
                process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
                    if (err) throw err;
                    // res.cookie(`token`, token,).json(userWithImage)
                    res.cookie(`token`, token, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'strict',
                    }).json(userWithImage)


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




module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateUser,
    updatePassword,
}