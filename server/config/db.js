const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shodh_db';

  try {
    // Attempt standard connection first
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to fallback if daemon is not running
    });
    console.log(`✅ MongoDB Connected to: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ Standard MongoDB connection failed at ${uri} (${error.message}).`);
    
    // In development mode, provide zero-friction fallback via mongodb-memory-server
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('🔄 Initializing in-memory MongoDB server for instant local demo...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create();
        const memUri = mongodInstance.getUri();
        const conn = await mongoose.connect(memUri);
        console.log(`✅ Connected to In-Memory MongoDB at ${memUri}`);
        console.log('💡 Tip: For persistent storage, start a local MongoDB service or supply MONGODB_URI in .env');
        return conn;
      } catch (memErr) {
        console.error('❌ Failed to launch MongoMemoryServer:', memErr.message);
        throw error;
      }
    } else {
      console.error('❌ MongoDB Connection Error:', error.message);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

module.exports = { connectDB, disconnectDB };
