const jwt = require("jsonwebtoken");

const userModel = require("../Model/userModel");
module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader,"middleware one");
        const authToken = authHeader && authHeader.split(" ")[1];
        console.log(authToken,"middleware two");
        if (!authToken) {
          return res.json({
            loginfail: true,
            status:false,
            message: "No auth token",
    });
}
    const decode = jwt.verify(authToken, "JWT");

    const user = await userModel.findOne({_id:decode.userId});
    if (!user) {
        return res.json({
            message: "Unauthorized access",
            status: false,
            loginfail: true,
        });
    }
    req.user = user;
    next();
} catch (error) {
    console.log(error);
    return res.json({
        message: "Unauthorized access",
        status: false,
        loginfail: true,
    });
  }
};