import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    const { host, name } = mongoose.connection;
    console.log(`Database connected: ${host}, ${name}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default dbConnect;
