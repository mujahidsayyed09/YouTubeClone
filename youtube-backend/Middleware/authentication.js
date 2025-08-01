const jwt = require("jsonwebtoken");
const User = require("../Models/user");


const auth = async(req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({ error: "No token, authorization denied."})
    }else{
        try{
            const decode = jwt.verify(token, "Secret_Key");
            req.user = await User.findById(decode.userId).select("-password");
            next();
        }catch{
            res.status(400).json({ error: "Token is not valid."});
        }
    }
}

module.exports = auth;