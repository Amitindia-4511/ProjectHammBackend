import { verifyToken } from "../utils/manageToken.utils.js";

function verifyUser(req, res, next) {
  try {
    const token = req.cookies;
    if (token) {
      const verifiedToken = verifyToken(token.authUser);
      if (verifiedToken) {
        req.body.userId = verifiedToken.userId;
        next();
      } else {
        req.body.validToken = false;
        return res.status(401).send({ message: "Invalid user" });
      }
    }
  } catch (error) {
    return error;
  }
}

export default verifyUser;
