const User = require("../models/User.js");
const Customer = require("../models/Customer.js");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      password: hash,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      birthday: req.body.birthday,
      isAdmin: req.body.isAdmin,
      isEmployee: req.body.isEmployee,
      sex: req.body.sex,
    });

    const regUser = await newUser.save();
    res.status(200).json(regUser);
  } catch (err) {
    next(err);
  }
};


const registerCust = async (req, res, next) => {
  try {
    const { name, email, password, photo } = req.body;
    // Check if name was entered
    if (!name) {
      return res.json({
        error: 'name is required'
      })
    }
    // Check is password is good

    if (!password || password.length < 8) {
      return res.json({
        error: 'Password is required and should be at least 8 characters long'
      })
    }

    // Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'Email is taken'
      })
    }

    const hashedPassword = await hashPassword(password)

    const user = await User.create({
      name, email, password: hashedPassword, photo
    })
    return res.json(user);

  } catch (error) {
    console.log(error)
  }
};


//OLD CUSTOMER REGISTER
// const registerCust = async (req, res, next) => {
//   try {
//     var salt = bcrypt.genSaltSync(10);
//     var hash = bcrypt.hashSync(req.body.password, salt);

//     const newUserCust = new Customer({
//       name: req.body.name,
//       password: hash,
//       email: req.body.email,
//       photo: req.body.photo,
//     });

//     const regUserCust = await newUserCust.save();
//     res.status(200).json(regUserCust);
//   } catch (err) {
//     next(err);
//   }
// };



const loginCust = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await Customer.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Wrong Password or Email!' });
    }

    // Successfully authenticated
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10s' }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Save refreshToken with the current user
    user.refreshToken = refreshToken;
    user.isEmployee = true; // Set the isEmployee field based on your business logic.
    const result = await user.save();

    // Create a secure cookie with the refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send access token and isEmployee to the user
    res.json({ accessToken, isEmployee: user.isEmployee });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Password or Username!"));

    // success
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isAdmin: user.isEmployee,
      },
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ otherDetails });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, getUser, login, registerCust, loginCust };