const Admin = require('../models/Admin.js')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary/cloudinary')
const bcrypt = require('bcrypt');

//Register Endpoint
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createAdmin = async (req, res) => {
    try {
        const { name, email, password, image, username, address, birthday, phoneNumber, sex, isAdmin, isManager } = req.body;

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
        const exist = await Admin.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const exist2 = await Admin.findOne({ username });
        if (exist2) {
            return res.json({
                error: 'Username is already taken'
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

        const user = await Admin.create({
            username,
            address,
            birthday,
            phoneNumber,
            sex,
            name,
            email,
            password: hashedPassword,
            image: `https://res.cloudinary.com/dl0qncxjh/image/upload/${uploadedImage.public_id}`,
            isAdmin,
            isManager,
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



//Login Endpoint
const loginAdmin = async (req, res) => {
    try {
        const { username, password, image } = req.body;

        // Check if user exists
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.json({
                error: 'No user found'
            });
        }

        // Check if password matches
        const match = await comparePassword(password, admin.password);

        if (match) {

            // Password matches, you can proceed with user authentication here.
            const imageUrl = `https://res.cloudinary.com/dl0qncxjh/image/upload/${admin.image}`;
            const adminWithImage = { ...admin.toObject() };

            jwt.sign(
                {
                    email: admin.email,
                    username: admin.username,
                    id: admin._id,
                    name: admin.name,
                    image: admin.image,
                    isEmployee: admin.isEmployee,
                    isManager: admin.isManager,
                    isAdmin: admin.isAdmin,
                },

                // process.env.JWT_SECRET, {}, (err, token) => {
                process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
                    if (err) throw err;
                    // res.cookie(`token`, token,).json(userWithImage)
                    res.cookie(`token`, token, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'strict',
                    }).json(adminWithImage)

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
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, admin) => {
            if (err) throw err;
            res.json(admin)
        })
    }
    else {
        res.json(null)
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await Admin.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
};

const getUsers = async (req, res, next) => {
    try {
        const user = await Admin.find();
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    createAdmin,
    loginAdmin,
    getUser,
    getUsers,
    getProfile,
    updateUser
}