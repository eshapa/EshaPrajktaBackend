// middleware/validateUser.js
const { verifyToken } = require("../Config/auth");

const validateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const cleanToken = token.replace("Bearer ", "").trim();
        const decoded = verifyToken(cleanToken);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = validateUser;
