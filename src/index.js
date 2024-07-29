import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Specify a custom path if your file containing environment variables is located elsewhere.
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });

    app.listen(process.env.port || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!! ", err);
  });

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
