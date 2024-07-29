import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  console.log("reeq.....", req);
  // Get user details from frontend
  const { fullName, email, username, password } = req.body;

  // Validate fields are not empty
  if ([fullName, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle file uploads
  let avatarUrl, coverImageUrl;

  if (req.files) {
    const avatarLocalPath = req.files.avatar?.[0]?.path;
    const coverImageLocalPath = req.files.coverImage?.[1]?.path;

    console.log(
      "uploading...",
      req.files,
      avatarLocalPath,
      coverImageLocalPath
    );

    //   if (avatarLocalPath) {
    //     const avatar = await uploadOnCloudinary(avatarLocalPath);
    //     if (!avatar) {
    //       throw new ApiError(400, "Failed to upload avatar");
    //     }
    //     avatarUrl = avatar.url;
    //   } else {
    //     throw new ApiError(400, "Avatar file is required");
    //   }

    //   if (coverImageLocalPath) {
    //     const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    //     if (coverImage) {
    //       coverImageUrl = coverImage.url;
    //     }
    //   }
    // }

    // // Create user in the database
    // const user = await User.create({
    //   fullName,
    //   avatar: avatarUrl,
    //   coverImage: coverImageUrl || "", // Default to empty string if coverImageUrl is undefined
    //   email,
    //   password,
    //   username: username.toLowerCase(),
    // });

    // // Remove password and refresh token fields from response
    // const createdUser = await User.findById(user._id).select(
    //   "-password -refreshToken"
    // );

    // if (!createdUser) {
    //   throw new ApiError(500, "Something went wrong while registering the user");
    // }

    return res.status(201);
    // .json(new ApiResponse(200, createdUser, "User registered successfully"));
  }
});

export { registerUser };
