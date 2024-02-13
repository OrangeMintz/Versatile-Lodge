const Admin = require('../models/Admin.js')
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const cloudinary = require('../cloudinary/cloudinary')
const bcrypt = require('bcrypt');

const ArchiveUsers = require('../models/ArchiveUsers.js');


//Register Endpoint
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const createAdmin = async (req, res) => {
    try {
        const { name, email, password, image, username, address, birthday, phoneNumber, sex, isAdmin, isManager, isReceptionist } = req.body;

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

        const nameRegex = /^[a-zA-Z. ]+$/;
        if (!nameRegex.test(name)) {
            return res.json({
                error: 'Name should not contain numbers and special characters'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json({
                error: 'Invalid email format'
            });

        }

        if (!address) {
            return res.json({
                error: 'Address is required'
            });
        }

        if (!birthday) {
            return res.json({
                error: 'Birthday is required'
            });
        }

        if (!phoneNumber) {
            return res.json({
                error: 'Phone Number is required'
            });
        }

        if (!sex) {
            return res.json({
                error: 'Sex/Gender is required'
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
            isReceptionist,
            isArchive: false
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

        // Check if the user is archived
        if (admin.isArchive) {
            return res.json({
                error: 'User is archived and not allowed to log in'
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
                    phoneNumber: admin.phoneNumber,
                    isReceptionist: admin.isReceptionist,
                    isManager: admin.isManager,
                    isAdmin: admin.isAdmin,
                },
                process.env.JWT_SECRET,
                { expiresIn: '2h' },
                (err, aToken) => {
                    if (err) throw err;
                    res.cookie(`aToken`, aToken, {
                        secure: true,
                        httpOnly: true,
                        sameSite: 'strict',
                    }).json(adminWithImage);
                }
            );
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
        const { isArchive } = req.query;

        let users;
        if (isArchive === 'true') {
            users = await Admin.find({ isArchive: true });
        } else {
            users = await Admin.find({ isArchive: false });
        }

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const updateAccount = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = { ...req.body };

        // Remove undefined or empty values from the update object
        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === undefined || updateFields[key] === '') {
                delete updateFields[key];
            }
        });

        // Check if an image is provided and upload it to Cloudinary
        if (updateFields.image) {
            try {
                const uploadedImage = await cloudinary.uploader.upload(updateFields.image, {
                    upload_preset: 'unsigned_upload',
                    // public_id: `${id}avatar`,
                    public_id: `AccountSettings/${id}avatar`, // Specify the folder structure here

                    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
                });

                // Update the 'image' property in the updateFields object
                updateFields.image = uploadedImage.secure_url;
            } catch (uploadError) {
                console.error('Error uploading image to Cloudinary:', uploadError);
                return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
            }
        } else {
            // If no image is provided, do not update the 'image' property
            delete updateFields.image;
        }

        // Update the user in the database
        const updatedUser = await Admin.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new token with updated information
        const updatedToken = jwt.sign(
            {
                email: updatedUser.email,
                username: updatedUser.username,
                id: updatedUser._id,
                name: updatedUser.name,
                image: updatedUser.image,
                phoneNumber: admin.phoneNumber,
                isReceptionist: updatedUser.isReceptionist,
                isManager: updatedUser.isManager,
                isAdmin: updatedUser.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        // Send the updated token as a cookie in the response
        res.cookie(`aToken`, updatedToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        }).json(updatedUser);

    } catch (err) {
        next(err);
    }
};



const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = { ...req.body };

        // Remove undefined or empty values from the update object
        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] === undefined || updateFields[key] === '') {
                delete updateFields[key];
            }
        });

        // Check if an image is provided and upload it to Cloudinary
        if (updateFields.image) {
            try {
                const uploadedImage = await cloudinary.uploader.upload(updateFields.image, {
                    upload_preset: 'unsigned_upload',
                    public_id: `${id}avatar`,
                    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
                });

                // Update the 'image' property in the updateFields object
                updateFields.image = uploadedImage.secure_url;
            } catch (uploadError) {
                console.error('Error uploading image to Cloudinary:', uploadError);
                return res.status(500).json({ error: 'Error uploading image to Cloudinary' });
            }
        } else {
            // If no image is provided, do not update the 'image' property
            delete updateFields.image;
        }

        // If password is being updated, hash the new password
        if (updateFields.password) {
            const hashedPassword = await hashPassword(updateFields.password);
            updateFields.password = hashedPassword;
        }

        // Update the user in the database
        const updatedUser = await Admin.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};


//ARCHIVE USERS:
const archiveUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get user details before updating
        const userToArchive = await Admin.findById(id);

        if (!userToArchive) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user in the Admin collection
        await Admin.findByIdAndUpdate(id, { isArchive: true });

        // Create an entry in ArchiveUsers with all fields
        const archivedUser = await ArchiveUsers.create({
            name: userToArchive.name,
            username: userToArchive.username,
            email: userToArchive.email,
            password: userToArchive.password,
            image: userToArchive.image,
            address: userToArchive.address,
            birthday: userToArchive.birthday,
            phoneNumber: userToArchive.phoneNumber,
            sex: userToArchive.sex,
            isAdmin: userToArchive.isAdmin,
            isManager: userToArchive.isManager,
            isReceptionist: userToArchive.isReceptionist,
        });

        // console.log('User archived successfully:', archivedUser);

        res.status(200).json({ message: 'User archived successfully', archivedUser });
    } catch (err) {
        console.error('Error archiving user:', err);
        next(err);
    }
};

//UNARCHIVE USERS:
const unarchiveUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the user by ID and update the isArchive field
        const updatedUser = await Admin.findByIdAndUpdate(id, { isArchive: false }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User unarchived successfully', updatedUser });
    } catch (err) {
        console.error('Error unarchiving user:', err);
        next(err);
    }
};


module.exports = {
    createAdmin,
    loginAdmin,
    getUser,
    getUsers,
    updateUser,
    updateAccount,
    archiveUser,
    unarchiveUser,
}