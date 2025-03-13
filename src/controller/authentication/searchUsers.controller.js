import { User } from "../../model/registration.model.js";
import { verifyToken } from "../../utils/manageToken.utils.js";

async function searchUsers(req, res) {
  const { query } = req.query;
  const token = req.cookies;
  const verifiedToken = verifyToken(token.authUser);
  const { userId } = verifiedToken;
  const users = await User.find(
    { name: { $regex: query, $options: "i" }, _id: { $ne: userId } },
    { _id: 1, name: 1, email: 1, age: 1 }
  );
  res.json(users);
}

export default searchUsers;
