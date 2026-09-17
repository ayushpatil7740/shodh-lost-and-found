const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  let uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shodh_db';

  // Sanitize URI: remove accidental quotes and leading/trailing whitespace
  if (typeof uri === 'string') {
    uri = uri.trim().replace(/^['"]|['"]$/g, '');
  }

  // Validate scheme prefix
  const isValidScheme = uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
  if (!isValidScheme) {
    console.warn(`⚠️ Warning: MONGODB_URI does not start with 'mongodb://' or 'mongodb+srv://'. Value received: "${uri}"`);
  }

  try {
    if (!isValidScheme) {
      throw new Error(`Invalid MongoDB connection scheme. The connection string must begin with 'mongodb://' or 'mongodb+srv://'. Received: '${uri}'`);
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected to: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ Standard MongoDB connection failed (${error.message}).`);

    // In development or if memory server fallback is suitable
    if (process.env.NODE_ENV !== 'production' || !isValidScheme) {
      try {
        console.log('🔄 Initializing in-memory MongoDB server for zero-friction fallback...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        mongodInstance = await MongoMemoryServer.create();
        const memUri = mongodInstance.getUri();
        const conn = await mongoose.connect(memUri);
        console.log(`✅ Connected to In-Memory MongoDB at ${memUri}`);
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
