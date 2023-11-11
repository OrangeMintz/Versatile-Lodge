const axios = require('axios');

const instance = axios.create({
    withCredentials: true, // Send cookies with the request
});

module.exports = instance;