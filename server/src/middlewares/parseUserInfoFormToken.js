import jwt from "jsonwebtoken";
const parseUserInfoFormToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return next();

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) return next();
    req.user = user;
    next();
  });
};

export default parseUserInfoFormToken;
