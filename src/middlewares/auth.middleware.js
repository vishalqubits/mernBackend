import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log("Received token:", token); // Debugging line

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token:", decodedToken); // Debugging line

    if (!decodedToken || !decodedToken._id) {
      throw new ApiError(401, "Unauthorized request: Invalid token");
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Unauthorized request: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in verifyJWT:", error); // Debugging line

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid access token");
    } else if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access token has expired");
    } else {
      throw new ApiError(401, error.message || "Unauthorized request");
    }
  }
});
