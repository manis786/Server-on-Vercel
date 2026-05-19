import mongoose from "mongoose";

// Connection status ko track karne ke liye ek global variable
let isConnected = false;

const connectDB = async () => {
  // Agar pehle se connected hai to dobara connect mat karo
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    // Agar config.js se koi masla ho raha hai, to direct process.env use karein
    const db = await mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds se zyada wait na kare
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("Database Connected !");
  } catch (error) {
    console.log(`Error While Connecting Database ${error}`);
    // Serverless mein error throw karna zaroori hai taake route handler ko pata chal sake
    throw error; 
  }
};

export default connectDB;