import { Router } from "express";
import registerUser from "../controller/authentication/register.controller.js";
import loginUser from "../controller/authentication/login.controller.js";
import logoutUser from "../controller/authentication/logout.controller.js";
import currentUser from "../controller/authentication/currentUser.controller.js";
import verifyUser from "../middleware/verifyUser.js";
import getUsers from "../controller/authentication/getUsers.controller.js";
import searchUsers from "../controller/authentication/searchUsers.controller.js";

const authUserRouter = Router();
authUserRouter.post("/register", registerUser);
authUserRouter.post("/login", loginUser);
authUserRouter.post("/logout", verifyUser, logoutUser);
authUserRouter.get("/me", currentUser);
authUserRouter.get("/getusers", getUsers);
authUserRouter.get("/searchusers", searchUsers);
export { authUserRouter };
