import connectDB from "./db/index.js";
import dotenv from "dotenv";

// Specify a custom path if your file containing environment variables is located elsewhere.
dotenv.config({
  path: "./env",
});

connectDB();

// import express from "express";

// const app = express();

// // if-fy
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", () => {
//       console.log("ERROR: ", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port: ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("ERROR:", error);
//   }
// })();
