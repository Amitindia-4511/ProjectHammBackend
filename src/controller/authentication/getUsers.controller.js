import mongoose from "mongoose";
import { Chat } from "../../model/chat.model.js";
import { verifyToken } from "../../utils/manageToken.utils.js";

async function getUsers(req, res) {
  try {
    const token = req.cookies;
    const verifiedToken = verifyToken(token.authUser);
    const { userId } = verifiedToken;
    const userObjectId = new mongoose.Types.ObjectId(`${userId}`);
    const aggregateUsers = await Chat.aggregate(
      // Match documents where the logged-in user is one of the participants
      [
        {
          $match: {
            participants: {
              $in: [userObjectId],
            },
          },
        },
        // Unwind the participants array (explode the participants into separate documents)
        {
          $unwind: {
            path: "$participants",
          },
        },
        // // Exclude the logged-in user from the participants array
        {
          $match: {
            participants: {
              $ne: userObjectId,
            },
          },
        },
        // Perform a lookup to get the user details for the remaining participants
        {
          $lookup: {
            from: "users", // The users collection where user info is stored
            localField: "participants", // The field from this document (participants)
            foreignField: "_id", // The field from the users collection (user ID)
            as: "user_details", // The field in the output that will contain the user info
          },
        },

        {
          $project: {
            _id: 0,
            "user_details.name": 1,
            "user_details.email": 1,
            "user_details.age": 1,
            "user_details._id": 1,
          },
        },
      ]
    );

    const users = aggregateUsers.map((user) => {
      const userDetails = user.user_details[0];
      // console.log({ userDetails });
      const { _id, name, email, age } = userDetails;
      return { name, email, age, _id };
    });
    if (users) {
      return res.json(users);
    } else {
      return res.json({ message: "not users found" });
    }
  } catch (error) {
    return res.json({ message: `Error while fetching users${error}` });
  }
}

export default getUsers;
