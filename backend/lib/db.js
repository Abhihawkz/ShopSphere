import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected ${res.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to database ${error.message}`);
  }
};

export default connectDb;
