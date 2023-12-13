const createError = require('./error.js');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const aToken = req.cookies.aToken; // change to 'token' as you are setting it in loginAdmin
    if (!aToken) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(aToken, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin || req.user.isEmployee || req.user.isManager) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
}

module.exports = { verifyToken, verifyUser, verifyAdmin };



// const createError = require('./error.js');
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return next(createError(401, "You are not authenticated!"));
//     }

//     jwt.verify(token, process.env.JWT, (err, user) => {
//         if (err) return next(createError(403, "Token is not valid!"));
//         req.user = user;
//         next();
//     });
// }


// const verifyUser = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.user.id === req.params.id || req.user.isAdmin) {
//             next()
//         }
//         else {
//             return next(createError(403, "You are not authorized!"));
//         }
//     })
// }

// const verifyAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.user.isAdmin) {
//             next()
//         }
//         else {
//             return next(createError(403, "You are not authorized!"));
//         }
//     })
// }


// module.exports = { verifyToken, verifyUser, verifyAdmin }
