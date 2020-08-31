const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ message: "nnonono you thief" });
    }

    try {
        const decoded = jwt.verify(token, "seifewdaystogo");
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "invalid token" });
    }
};