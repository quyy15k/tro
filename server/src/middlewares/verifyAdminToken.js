import jwt from "jsonwebtoken";
const verifyAdminToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken)
    return res.status(401).json({
      err: 1,
      msg: "Missing access token",
    });

  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err)
      return res.status(401).json({
        err: 1,
        msg: "Access token expired",
      });
    if (user?.role === "admin") {
      req.user = user;
    } else {
      return res.status(403).json({
        err: 1,
        msg: "Tài khoản không đủ quyền hạng",
      });
    }
    next();
  });
};

export default verifyAdminToken;
