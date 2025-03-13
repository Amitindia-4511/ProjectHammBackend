import { User } from "../model/registration.model.js";

export const userExist = async (email) => {
  const userEmail = email.toLowerCase();
  const user = await User.findOne({ email: userEmail });
  return user;
};

export const findUserById = async (userId) => {
  return await User.findById({ _id: userId });
};
