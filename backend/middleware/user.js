const jwt_decode = require("jwt-decode");
const User = require("../models/User");

// Get data of user who logged in
async function getLoggedinUser(req, res, next) {

    let loggedinUser;
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt_decode(token);
        const userId = decoded.id;
        try {
          loggedinUser = await User.findById(userId);
          if (!loggedinUser) {
            return res.status(404).json({error: "User not found"});
          }
        } catch(error) {
          return res.status(500).json({error: error.message});
        }
        res.loggedinUser = loggedinUser;
        next();
    } else {
        res.loggedinUser = null;
        next();
    }
}

module.exports = {getLoggedinUser};
