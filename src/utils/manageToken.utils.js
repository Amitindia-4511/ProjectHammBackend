import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.SECRET_JWT_KEY, {
      expiresIn: "1h",
    });
  } catch (error) {
    return error;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_JWT_KEY);
  } catch (error) {
    return error;
  }
};
