import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "";
const DATABASE = process.env.DATABASE || "";

console.log({ MONGO_URL, DATABASE });

mongoose.connection.on('error', (error) => {
  console.log('DB connection error:', error);
});

const connectDB = async () => {
  try {
    // Für neuere Mongoose-Versionen: dbName direkt im Connection String
    const connectionString = MONGO_URL.includes('?') 
      ? `${MONGO_URL}&dbName=${DATABASE}`
      : `${MONGO_URL}/${DATABASE}`;
    
    await mongoose.connect(connectionString);
    console.log('✅ Connected to MongoDB!');
  } catch (error) {
    console.error('❌ Connection error:', error);
    process.exit(1); // Server beenden bei Verbindungsfehler
  }
};

export default connectDB;