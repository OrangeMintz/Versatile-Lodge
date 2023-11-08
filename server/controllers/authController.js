const Customer = require('../models/Customer')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.json('test is working');
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name was entered and does not contain leading/trailing spaces
        if (!name || name.trim() !== name) {
            return res.json({
                error: 'Name is required and should not contain leading/trailing spaces'
            });
        }

        // Check if name contains any special characters
        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,?~\\|-]/;
        if (specialCharacters.test(name)) {
            return res.json({
                error: 'Name should not contain special characters'
            });
        }

        if (!email) {
            return res.json({
                error: 'Email is required'
            });
        }

        // Check is password is good
        const validPassword = /^[A-Za-z0-9!@#$%&?]+$/.test(password);
        if (!password || password.length < 8 || !validPassword) {
            return res.json({
                error: `Password is required and should be at least 8 characters long.
                containing only A-Z, a-z, 0-9, and the symbols: !@#$%&?`
            });
        }

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
            password: hashedPassword
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}


//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

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
            jwt.sign(
                {
                    email: user.email,
                    id: user._id,
                    name: user.name
                },
                process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie(`token`, token).json(user)
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
    test,
    registerUser,
    loginUser,
    getProfile
}