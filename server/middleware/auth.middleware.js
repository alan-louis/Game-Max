const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  let token = "";
  if(req.headers.authorization != "" && req.headers.authorization != undefined) {
  const header = req.headers.authorization.split(" ");
  token = header[1];
  }
  if (token && token != "" && token != undefined && token != null) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        console.log("_id : ",user._id)
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("Le user n'est plus connecté !")
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  console.log("On passe par le requireAuth ?")
  let token = "";
  if(req.headers.authorization != "" && req.headers.authorization != undefined) {
  const header = req.headers.authorization.split(" ");
  token = header[1]
  }
  console.log("Token reqAuth : ",token)
  if (token && token != "" && token != undefined && token != null) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log("_id : ",decodedToken.id);
        next();
      }
    });
  } else {
    res.send(401).json('No token')
  }
};
