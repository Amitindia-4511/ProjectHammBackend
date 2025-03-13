import { User } from "../../model/registration.model.js";
import { hashData } from "../../utils/hash.utils.js";
import { userExist } from "../../utils/query.utils.js";

async function registerUser(req, res) {
  try {
    const { name, age, email, password } = req.body;
    // console.log("Before");
    const user = await userExist(email);
    if (user) {
      return res
        .status(409)
        .json({ message: "User is already registed with the same email" });
    } else {
      const hashedPassword = await hashData(password);
      const newUser = new User({ name, age, email, password: hashedPassword });
      await newUser.save();
      // console.log("after");
      return res.status(201).json({ message: "User registred successfully" });
    }
  } catch (error) {
    console.log("Error in register function", error);
    return res
      .status(500)
      .json({ message: `Error while creating user${error}` });
    // throw error(error)
  }
}

export default registerUser;
