import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connectionString: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connectionString.isConnected) {
    console.log("Already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    // console.log("done");
    connectionString.isConnected = db.connections[0].readyState;
    // console.log(connectionString.isConnected);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(0);
  }
}

export default dbConnect;
