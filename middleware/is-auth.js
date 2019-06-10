const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // getting the Authorization Header
  const authHeader = req.get("Authorization");
  // if there is no Authorization Header, we are not logged in
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // storing token into the right hand side of the Header
  const token = authHeader.split(" ")[1];
  // if there is no token, we are not authenticated
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    // verifiyng the token stored when logged in
    decodedToken = jwt.verify(token, "examplekeytomatch");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  // if the token doesn't match with the one stored in the user, we are not authenticated
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // if we passed all the checks, we are authenticated and the role of the User when the request comes is must be 'Admin'
  req.isAuth = true;
  req.role = "admin";
  next();
};
