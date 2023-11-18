const Admin = require('../models/Admin.js')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary/cloudinary')
const bcrypt = require('bcrypt');

//Register Endpoint

const createAdmin = async (req, res, next) => {
    try {
        // Hash the password before saving
        const hashedPassword = await hashPassword(req.body.password);
        const newAdmin = new Admin({
            ...req.body,
            password: hashedPassword,
        });

        const savedAdmin = await newAdmin.save();
        res.status(200).json(savedAdmin);
    } catch (err) {
        next(err);
    }
};



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


module.exports = {
    createAdmin,
    loginAdmin,
    getProfile
}