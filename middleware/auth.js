
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Check for token in 'Authorization' header, considering possible 'Bearer' prefix
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};



// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//     // Check for token in 'Authorization' header, considering possible 'Bearer' prefix
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.startsWith('Bearer ') 
//         ? authHeader.split(' ')[1] 
//         : req.header('x-auth-token');

//     // If no token is found, return a 401 Unauthorized response
//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     try {
//         // Verify the token using the JWT secret
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach the user ID from the token to the request object
//         req.user = decoded.user;

//         // Proceed to the next middleware or route handler
//         next();
//     } catch (err) {
//         // If token verification fails, return a 401 Unauthorized response
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// };



// const jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.header('x-auth-token');

//     if (!token) {
//         return res.status(401).json({ msg: 'No token, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user; // Ensure decoded.user contains user info
//         next();
//     } catch (err) {
//         res.status(401).json({ msg: 'Token is not valid' });
//     }
// };
