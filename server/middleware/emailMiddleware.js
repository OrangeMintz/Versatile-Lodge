
require('dotenv').config()
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: {
                name: 'Versatile Lodge',
                address: process.env.MAIL_USER,
            },
            to: "Nickzgacus@gmail.com", // list of receivers
            subject: "Room Reservation Update", // Subject line
            text: "OK this is for the message", // plain text body
            html: "<b>Room Reservation Update</b>", // html body
        });

        console.log('Message sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
