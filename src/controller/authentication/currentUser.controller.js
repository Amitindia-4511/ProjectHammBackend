import { verifyToken } from "../../utils/manageToken.utils.js";
import { findUserById } from "../../utils/query.utils.js";

async function currentUser(req, res) {
  try {
    const token = req.cookies;
    // console.log(token);

    const verifiedToken = verifyToken(token.authUser);
    const user = await findUserById(verifiedToken.userId);
    if (user) {
      return res.status(200).json({ message: "user found", user });
    } else {
      return res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.log("error while fetching current user");
    return res.status(500).json({ message: "error while fetching user data" });
  }
}
export default currentUser;
