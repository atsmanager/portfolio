// import mongoose from "mongoose"

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio")
//     console.log("MongoDB Connected")
//   } catch (err) {
//     console.error(err)
//     process.exit(1)
//   }
// }

// export default connectDB


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
