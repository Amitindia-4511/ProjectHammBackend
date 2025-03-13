function logoutUser(req, res) {
  res.clearCookie("authUser");
  return res.status(200).send({ message: "User Logged Out" });
}

export default logoutUser;
